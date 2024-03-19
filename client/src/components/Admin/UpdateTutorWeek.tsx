import { useState } from "react";
import { Schedule, Day } from "./Interfaces.ts";

import UpdateTutorDay from "./UpdateTutorDay.tsx";

interface Props {
    inputSchedule: Schedule;
}

const UpdateTutorWeek: React.FC<Props> = ({ inputSchedule }) => {

    const [schedule, setSchedule] = useState<Schedule>(inputSchedule);
    if (!schedule) return <></>;

    // JSON is unordered. This array is necessary to display in order
    const daysOrder: (keyof Schedule)[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const handleAddToSchedule = (dayKey: keyof Schedule) => {
        const newTimeSlot: Day = {
            end: "17:00:00",
            start: "09:00:00",
            location: "Valencia"
        };
        const updatedSchedule = {
            ...schedule,
            [dayKey]: [...schedule[dayKey], newTimeSlot]
        };
        setSchedule(updatedSchedule);
    }

    const handleRemoveFromSchedule = (uniqueKey: string) => {
        const [dayKey, targetIndex]: [keyof Schedule, string] = uniqueKey.split(`-`) as [keyof Schedule, string];
        const updatedSchedule = {
            ...schedule,
            [dayKey]: schedule[dayKey].filter((_, index) => index !== parseInt(targetIndex))
        };
        setSchedule(updatedSchedule);
    }

    const handleChangeSchedule = (uniqueKey: string, property: string, value: string): void => {
        const keySplit = uniqueKey.split(`-`);
        const day: (keyof Schedule) = keySplit[0] as (keyof Schedule);
        const targetIndex: number = Number(keySplit[1]);

        const updatedSchedule = {
            ...schedule,
            [day]: schedule[day].map((timeSlot, i) => {
                if (i === targetIndex) {
                    return {
                        ...timeSlot,
                        [property]: value
                    };
                }
                return timeSlot;
            })
        };
        setSchedule(updatedSchedule);
    }

    return (
        <div className="px-4 py-8 rounded bg-neutral-800">
            {daysOrder.map((dayKey) => {
                let dayName = "";
                switch (dayKey) {
                    case "mon": dayName = "Monday"; break;
                    case "tue": dayName = "Tuesday"; break;
                    case "wed": dayName = "Wednesday"; break;
                    case "thu": dayName = "Thursday"; break;
                    case "fri": dayName = "Friday"; break;
                    case "sat": dayName = "Saturday"; break;
                    case "sun": dayName = "Sunday"; break;
                }

                return <div key={dayKey}>
                    <h3 className="font-bold mb-2">{dayName}</h3>
                    <UpdateTutorDay
                        dayKey={dayKey}
                        inputDay={schedule[dayKey]}
                        handleAddToSchedule={handleAddToSchedule}
                        handleRemoveFromSchedule={handleRemoveFromSchedule}
                        handleChangeSchedule={handleChangeSchedule}
                    />
                    <hr className="h-px my-4 border-0 bg-gray-700"></hr>
                </div>
            })}
        </div>
    )
}

export default UpdateTutorWeek;