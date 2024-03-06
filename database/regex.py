import re

# Sample data
data = """
MW 10:00 AM - 4:00 PM at CCC MESA/TTh 2:00 PM - 7:00 PM at Valencia MESA
TWTh 4:00 PM - 7:00 PM on Discord/SA 11:00 AM - 3:00 PM on Discord
MW 5:00 PM - 7:30 PM/TTh 5:00 PM - 9:00 PM all hours on Discord
"""

# matches MTWThFSaSu
day_pattern = r'''\b(?:M(?:on)?|T(?:ue)?|W(?:ed)?|Th(?:u)?|F(?:ri)?|Sa(?:t)?|Su(?:n)?)\b'''

# matches xx:xx xM - xx:xx xM
time_pattern = r'''\d{1,2}(?::\d{2})?\s*[AP]M\s*-\s*\d{1,2}(?::\d{2})?\s*[AP]M''' 

# find locations
location_pattern = r'''(?<=\s|^)(?:Online|Discord|Valencia|Canyon Country|CCC)(?=\s|$)'''

# Find all occurrences of days, times, and locations
all_schedules = re.findall(r'.+?(?=/)', data, re.DOTALL)

for schedule in all_schedules:
    days = re.findall(day_pattern, schedule)
    times = re.findall(time_pattern, schedule)
    locations = re.findall(location_pattern, schedule)
    
    print("Days:", days)
    print("Times:", times)
    print("Locations:", locations)
    print()

### TO-DO: INSERT EXCEL INTO PSQL
# for each row, separate all schedules by delimiter /
# for each schedule
    # match days with MTWThFSaSu
    # match times with format xx:xx xM - xx:xx xM
    # match locations by keywords
    # for each day matched, insert time and location into right place