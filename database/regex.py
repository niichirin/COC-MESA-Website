import re
import json

# Sample data
data = """MW 10:00 AM - 4:00 PM, 4:00pm - 5pm at CCC MESA/TTh 2:00 PM - 7:00 PM at Valencia MESA
TWTh 4:00 am - 7:00 PM on Discord/Sa 11:00 AM - 3:00 PM on Discord
MW 5pm - 7:30 pm/TTh 5:00pm-9:00PM all hours on Discord"""

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
        else:
            dayArr.append(dayStr[i])
            i += 1
    return dayArr

def break_times(inputTimes):
    newTimes = []
    for time in inputTimes:
        split = time.split('-')
        newTimes.append({
            "start": split[0].strip(),
            "end": split[1].strip()
        })
    return newTimes

for schedule in all_schedules:
    
    # obtain days, times, and location in schedule string
    days = break_days(re.match(day_pattern, schedule).group())
    times = break_times(re.findall(time_pattern, schedule))
    location = re.search(location_pattern, schedule)
    location = location.group() if location else None

    # initialize schedule
    scheduleObj = {
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
            if day == "M": scheduleObj["mon"].append(details)
            if day == "T": scheduleObj["tue"].append(details)
            if day == "W": scheduleObj["wed"].append(details)
            if day == "Th": scheduleObj["thu"].append(details)
            if day == "F": scheduleObj["fri"].append(details)
            if day == "Sa": scheduleObj["sat"].append(details)
            if day == "Su": scheduleObj["sun"].append(details)

    scheduleJSON = json.dumps(scheduleObj)
    print(scheduleJSON)
    print()

    

### TO-DO: INSERT EXCEL INTO PSQL
# for each row, separate all schedules by delimiter /
# for each schedule
    # match days with MTWThFSaSu
    # match times with format xx:xx xM - xx:xx xM
    # match locations by keywords
    # for each day matched, insert time and location into right place