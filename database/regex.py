import re
import json

# Sample data
data = """MW 12:00 AM - 4:00 PM, 12:00pm - 5pm at CCC MESA/TTh 2:00 PM - 7:00 PM at Valencia MESA
TWTh 4:00 am - 7:00 PM on Discord/Sa 11:00 AM - 3:00 PM on Discord
MW 5pm - 7:30 pm/TThSu 5:00pm-9:00PM all hours on Discord"""

# matches days by substring composed from set {M,T,W,Th,F,Sa,Su}
day_pattern = r'\b[M|T|W|Th|F|Sa|Su]+\b'

# matches times by substring xx:xx xM - xx:xx xM
time_pattern = r'\d{1,2}(?::\d{2})?\s*[AaPp][Mm]\s*-\s*\d{1,2}(?::\d{2})?\s*[AaPp][Mm]' 

# matches locations by keyword
location_pattern = r'''(?:Online|Discord|Valencia|Canyon Country|CCC)'''

# splits full schedule by / (same tutor) or \n (different tutor)
all_schedules = re.split(r'(?:/|\n)', data)

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

# converts formats #XM, #:## XM, #:##XM, ##:## XM, ##:##XM 
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
        am_pm = re.search(r'[AaPp][Mm]', time_parts[1]).group().upper()
    else:
        # minutes does NOT exist in string
        hours = re.search(r'\d{1,2}', time_str).group()
        minutes = "00"
        am_pm = re.search(r'[AaPp][Mm]', time_str).group().upper()

    # convert to military time with am_pm
    hours = str((int(hours)) % 12)
    if am_pm == "PM": hours = str(int(hours) + 12)
    
    # format as SQL time
    sql_time = f"{hours.zfill(2)}:{minutes.zfill(2)}:00"
    return sql_time

# break time strings into start and end tuples
def break_times(inputTimes):
    newTimes = []
    for time in inputTimes:
        split = time.split('-')
        newTimes.append({
            "start": convert_to_sql_time(split[0].strip()),
            "end": convert_to_sql_time(split[1].strip())
        })
    return newTimes

for schedule in all_schedules:
    
    # obtain days, times, and location in schedule string
    days = break_days(re.match(day_pattern, schedule).group())
    times = break_times(re.findall(time_pattern, schedule))
    location = re.search(location_pattern, schedule)
    location = location.group() if location else None

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
    print(schedule)
    print(scheduleJSON)
    print()

# def convert_schedule_to_JSON(input_schedule):
#     # matches days by substring composed from set {M,T,W,Th,F,Sa,Su}
#     day_pattern = r'\b(?:M|T|W|Th|F|Sa|Su)+\b'

#     # matches times by substring xx:xx xM - xx:xx xM
#     time_pattern = r'\d{1,2}(?::\d{2})?\s*[AaPp][Mm]\s*-\s*\d{1,2}(?::\d{2})?\s*[AaPp][Mm]' 

#     # matches locations by keyword
#     location_pattern = r'''(?:Online|Discord|Valencia|Canyon Country|CCC)'''

#     # splits full schedule by / (same tutor) or \n (different tutor)
#     all_schedules = re.split(r'(?:/|\n)', input_schedule)

#     for schedule in all_schedules:
#         # obtain days, times, and location in schedule string
#         days = break_days(re.match(day_pattern, schedule).group())
#         times = break_times(re.findall(time_pattern, schedule))
#         location = re.search(location_pattern, schedule)
#         location = location.group() if location else None

#         # initialize schedule
#         scheduleDict = {
#             "mon": [],
#             "tue": [],
#             "wed": [],
#             "thu": [],
#             "fri": [],
#             "sat": [],
#             "sun": []
#         }   

#         # create object with start, end, and location
#         detailsArr = []
#         for time in times:
#             detailsArr.append({
#                 "start": time["start"],
#                 "end": time["end"],
#                 "location": location
#             })
            
#         # iterate through days in schedule
#         for day in days:
#             # insert all details by day
#             for details in detailsArr:
#                 if day == "M": scheduleDict["mon"].append(details)
#                 if day == "T": scheduleDict["tue"].append(details)
#                 if day == "W": scheduleDict["wed"].append(details)
#                 if day == "Th": scheduleDict["thu"].append(details)
#                 if day == "F": scheduleDict["fri"].append(details)
#                 if day == "Sa": scheduleDict["sat"].append(details)
#                 if day == "Su": scheduleDict["sun"].append(details)

#         scheduleJSON = json.dumps(scheduleDict)
#         return scheduleJSON
        

