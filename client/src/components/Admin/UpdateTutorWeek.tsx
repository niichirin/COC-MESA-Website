import { useState } from "react";
import { Schedule } from "./Interfaces.ts";

import UpdateTutorDay from "./UpdateTutorDay.tsx";

interface Props {
    inputSchedule: Schedule;
}

const UpdateTutorWeek: React.FC<Props> = ({ inputSchedule }) => {

    const [schedule, setSchedule] = useState<Schedule>(inputSchedule);
    if (!schedule) return <></>;

    // JSON is unordered. This array is necessary to display in order
    const daysOrder: (keyof Schedule)[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const handleChangeSchedule = (uniqueKey: string, property: string, value: string): void => {
        const keySplit = uniqueKey.split(`-`);
        const day: (keyof Schedule) = keySplit[0] as (keyof Schedule);
        const targetIndex: number = Number(keySplit[1])
        
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
        }
        setSchedule(updatedSchedule);
    }

    console.log(schedule);

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
                        handleChangeSchedule={handleChangeSchedule}
                    />
                    <hr className="h-px my-4 border-0 bg-gray-700"></hr>
                </div>
            })}
        </div>
    )
}

export default UpdateTutorWeek;