import React from "react";

interface Tutor {
    name: string;
    schedule: {
        [key: string]: { start: string; end: string; location?: string }[];
    };
}

interface TutorScheduleListProps {
    tutor: Tutor;
}

const TutorScheduleList: React.FC<TutorScheduleListProps> = ({ tutor }) => {
    if (!tutor || !tutor.schedule) return null;

    // JSON in PSQL is unordered, this is here to order the iterations
    const daysOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    // iterate through schedules of each day
    const renderedSchedule = daysOrder.map((key) => {
        // tutor doesn't teach on this day
        if (!tutor.schedule[key]?.length) return null; 

        // concat strings for each timeframe of the day
        const times = tutor.schedule[key].map(
            (item) => `${item.start} - ${item.end} (${item.location})`
        );

        // assign day string based on key
        let day = "";
        switch (key) {
            case "mon":
                day = "Monday";
                break;
            case "tue":
                day = "Tuesday";
                break;
            case "wed":
                day = "Wednesday";
                break;
            case "thu":
                day = "Thursday";
                break;
            case "fri":
                day = "Friday";
                break;
            case "sat":
                day = "Saturday";
                break;
            case "sun":
                day = "Sunday";
                break;
            default:
                break;
        }

        return (
            <div key={key}>
                <p>
                    <b>{day}: </b>{" "}
                    {times.length === 1 ? times[0] : <ul>{times.map((time) => <li key={time}>{time}</li>)}</ul>}
                </p>
            </div>
        );
    });

    return <><h3>Schedule</h3><div>{renderedSchedule}</div></>;
};

export default TutorScheduleList;
