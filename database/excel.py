import os
import pandas as pd
import psycopg2

import re
import json

from dotenv import load_dotenv
from psycopg2 import sql
from sqlalchemy import create_engine

# load environment variables
load_dotenv()
print("Loaded environment variables")

# obtain env variables
db_user = os.getenv('DB_USER')
db_name = os.getenv('DB_NAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
excel_file = os.getenv('EXCEL_FILE')
print("Obtained environment variables")

# turn excel into data frames
tutors_df = pd.read_excel(
    excel_file, 
    sheet_name = "tutors", 
    header = 0
)
courses_df = pd.read_excel(
    excel_file, 
    sheet_name = "courses", 
    header = 0
)
tutors_courses_df = pd.read_excel(
    excel_file, 
    sheet_name = "tutors_courses", 
    header = 0
)
print("Turned spreadsheets into pandas dataframes")

# connect db
db = psycopg2.connect(
    database = db_name,
    user = db_user,
    password = db_password,
    host = db_host
)
print("Connected to PostgreSQL database")

# cursor.excute(query) obtains data
# cursor.fetchone() returns tuple of one row
# DB columns can be accessed with indices 
cursor = db.cursor()

# deletes table
cursor.execute("DELETE FROM tutors_courses")
cursor.execute("DELETE FROM tutors")
cursor.execute("DELETE FROM courses")
print("Deleted all entries")

# resets primary key sequence
cursor.execute("ALTER SEQUENCE public.tutors_courses_tutors_courses_id_seq RESTART WITH 1;")
cursor.execute("ALTER SEQUENCE public.tutors_tutor_id_seq RESTART WITH 1;")
cursor.execute("ALTER SEQUENCE public.courses_course_id_seq RESTART WITH 1;")
print("Reset primary key sequence")

# commits changes
db.commit()
print("Committed changes")

# create sql engine with connection to db
conn_string = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(conn_string)
print("Created SQLEngine with connection string " + conn_string)

# helper method to break day substrings constructed from set {M, T, W, Th, F, Sa, Su}
def break_days(dayStr):
    dayArr = []
    i = 0
    while i < len(dayStr):
        if dayStr[i] == 'T' and i + 1 < len(dayStr) and dayStr[i + 1] == 'h':
            dayArr.append('Th')
            i += 2  # Skip the 'h'
        elif dayStr[i] == 'S':
            if dayStr[i + 1] == 'a':
                dayArr.append('Sa')
                i += 2 # Skip the 'a'
            elif dayStr[i + 1] == 'u':
                dayArr.append('Su')
                i += 2 # Skip the 'u'
        else:
            dayArr.append(dayStr[i])
            i += 1
    return dayArr

# helper method to convert time formats #XM, #:## XM, #:##XM, ##:## XM, ##:##XM 
# assumes format always has AM or PM
def convert_to_sql_time(time_str):

    time_parts = []
    hours = ""
    minutes = ""
    am_pm = ""

    # split time string 
    if ":" in time_str:
        # minutes exists
        time_parts = re.split(':', time_str)
        hours = time_parts[0]
        minutes = re.search(r'\d{2}', time_parts[1]).group()
        am_pm = re.search(r'[AaPp][Mm]', time_parts[1], re.IGNORECASE).group().upper()
    else:
        # minutes does NOT exist in string
        hours = re.search(r'\d{1,2}', time_str).group()
        minutes = "00"
        am_pm = re.search(r'[AaPp][Mm]', time_str, re.IGNORECASE).group().upper()

    # convert to military time with am_pm
    hours = str((int(hours)) % 12)
    if am_pm == "PM": hours = str(int(hours) + 12)
    
    # format as SQL time
    sql_time = f"{hours.zfill(2)}:{minutes.zfill(2)}:00"
    return sql_time

# helper method to break time strings into start and end pairs
def break_times(inputTimes):
    newTimes = []
    for time in inputTimes:
        split = time.split('-')
        newTimes.append({
            "start": convert_to_sql_time(split[0].strip()),
            "end": convert_to_sql_time(split[1].strip())
        })
    return newTimes

# convert schedule from excel row to JSON
def convert_schedule_to_JSON(input_schedule):
    # matches days by substring composed from set {M,T,W,Th,F,Sa,Su}
    day_pattern = r'\b[M|T|W|Th|F|Sa|Su]+\b'

    # matches times by substring xx:xx xM - xx:xx xM
    time_pattern = r'\d{1,2}(?::\d{2})?\s*[AaPp][Mm]\s*-\s*\d{1,2}(?::\d{2})?\s*[AaPp][Mm]' 

    # matches locations by keyword
    location_pattern = r'''(?:Online|Discord|Valencia|Canyon Country|CCC)'''

    # splits full schedule by / (same tutor) or \n (different tutor)
    all_schedules = re.split(r'(?:\s*/\s*|\n)', input_schedule)

    # initialize schedule
    scheduleDict = {
        "mon": [],
        "tue": [],
        "wed": [],
        "thu": [],
        "fri": [],
        "sat": [],
        "sun": []
    }   

    for schedule in all_schedules:

        days = break_days(re.match(day_pattern, schedule, re.IGNORECASE).group())
        times = break_times(re.findall(time_pattern, schedule, re.IGNORECASE))
        location = re.search(location_pattern, schedule, re.IGNORECASE)
        location = location.group() if location else None

        # create object with start, end, and location
        detailsArr = []
        for time in times:
            detailsArr.append({
                "start": time["start"],
                "end": time["end"],
                "location": location
            })
            
        # iterate through days in schedule
        for day in days:
            # insert all details by day
            for details in detailsArr:
                if day == "M": scheduleDict["mon"].append(details)
                if day == "T": scheduleDict["tue"].append(details)
                if day == "W": scheduleDict["wed"].append(details)
                if day == "Th": scheduleDict["thu"].append(details)
                if day == "F": scheduleDict["fri"].append(details)
                if day == "Sa": scheduleDict["sat"].append(details)
                if day == "Su": scheduleDict["sun"].append(details)

    scheduleJSON = json.dumps(scheduleDict)
    return scheduleJSON
        
# append new tutors data into database
# tutors_df.to_sql('tutors', engine, if_exists='append', index=False)
# print("Appended tutors data")
for index, row in tutors_df.iterrows():
    name = row['tutor_name'].strip()
    email = row['tutor_email'].strip()
    schedule = convert_schedule_to_JSON(row['schedule'].strip())
    cursor.execute("INSERT INTO tutors(name, email, schedule) VALUES(%s, %s, %s)", [name, email, schedule])
    db.commit()
print("Appended tutors data")

# append new courses data into database
courses_df.to_sql('courses', engine, if_exists='append', index=False)
print("Appended courses data")

# function to obtain tutor id by name
def getTutorIdByName(tutor_name):
    cursor.execute("SELECT tutor_id FROM tutors WHERE name=%s", (tutor_name,))
    result = cursor.fetchone()
    if result is not None:
        tutor_id = result[0]
        return tutor_id
    else:
        return None

# function to obtain course id by name
def getCourseIdByClass(course_subject, course_number):
    cursor.execute("SELECT course_id FROM courses WHERE subject=%s AND number=%s", (course_subject, course_number))
    result = cursor.fetchone()
    if result is not None:
        course_id = result[0]
        return course_id
    else:
        return None
        
# relate tutors and courses
for index, row in tutors_courses_df.iterrows():
    # obtain excel data
    tutor_name = row['tutor_name'].strip()
    course_subject = row['course_subject']
    course_number = row['course_number']

    # use excel data to obtain IDs from DB
    tutor_id = getTutorIdByName(tutor_name)
    course_id = getCourseIdByClass(course_subject, course_number)

    # insert IDs into tutors_courses
    cursor.execute("INSERT INTO tutors_courses(tutor_id, course_id) VALUES (%s, %s)", (tutor_id, course_id))
    db.commit()
print("Appended tutors_courses data")

# insert schedule JSON

# commit
db.commit()

# close
cursor.close()
db.close()
