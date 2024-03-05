import os
import pandas as pd
import psycopg2

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
cursor.execute("DELETE FROM tutors")
cursor.execute("DELETE FROM courses")
cursor.execute("DELETE FROM tutors_courses")
print("Deleted all entries")

# resets primary key sequence
cursor.execute("ALTER SEQUENCE public.tutors_courses_tutors_courses_id_seq RESTART WITH 1;")
cursor.execute("ALTER SEQUENCE public.tutors_tutor_id_seq RESTART WITH 1;")
cursor.execute("ALTER SEQUENCE public.courses_course_id_seq RESTART WITH 1;")
print("Reset primary key sequence")

# commits changes
db.commit()
print("Committed changes")

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

# create sql engine with connection to db
conn_string = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(conn_string)
print("Created SQLEngine with connection string " + conn_string)

# append new tutors data into database
tutors_df.to_sql('tutors', engine, if_exists='append', index=False)
print("Appended tutors data")

# append new courses data into database
courses_df.to_sql('courses', engine, if_exists='append', index=False)
print("Appended courses data")

# TO-DO: Fix tutor_id and course_id returning null for some reason
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

# commit
db.commit()

# close
cursor.close()
db.close()
