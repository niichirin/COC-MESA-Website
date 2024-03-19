import React, { useState } from "react";
import { Schedule, Day } from "./Interfaces.ts";

interface Props {
    dayKey: keyof Schedule;
    inputDay: Day[];
    handleRemoveFromSchedule: (uniqueKey: string) => void;
    handleAddToSchedule: (dayKey: keyof Schedule) => void;
    handleChangeSchedule: (
        uniqueKey: string,
        property: string,
        value: string
    ) => void;
}

const UpdateTutorDay: React.FC<Props> = ({ 
    dayKey, 
    inputDay, 
    handleAddToSchedule,
    handleRemoveFromSchedule,
    handleChangeSchedule
}) => {

    const [day, setDay] = useState<Day[]>(inputDay);

    const handleAddTimeSlot = () => {
        setDay(prevDay => [
            ...prevDay,
            { start: "09:00:00", end: "17:00:00", location: "Valencia" }
        ]);
        handleAddToSchedule(dayKey);
    };

    const handleRemoveTimeSlot = (uniqueKey: string) => {
        const keySplit = uniqueKey.split('-') // day-index => [day, index]
        const targetIndex = keySplit[1];
        setDay(day.filter((_, index) => index !== parseInt(targetIndex)));
        handleRemoveFromSchedule(uniqueKey);
    };

    const handleInputChange = (uniqueKey: string, property: keyof Day, value: string) => {
        const keySplit = uniqueKey.split('-'); // day-index => [day, index]
        const index = Number(keySplit[1]);
        setDay(prevDay => prevDay.map((timeSlot, i) =>
            i === index ? { ...timeSlot, [property]: value } : timeSlot
        ));
        handleChangeSchedule(uniqueKey, property, value);
    };

    // note: time converts like this
    //      SQL TIME to HTML <input>   - hh:mm:ss (military time) to hh:mm XM
    //      HTML <input> to JavaScript - hh:mm XM to hh:mm (military time)
    return (
        <>
            {day && day.map((timeSlot, index) => {
                const uniqueKey = `${dayKey}-${index}`
                return (
                    <div key={uniqueKey}>
                        <input
                            type="time"
                            value={timeSlot.start}
                            onChange={(e) => handleInputChange(uniqueKey, "start", e.target.value)}
                            className="px-2 py-1 rounded"
                            placeholder="Start Time"
                        />
                        <input
                            type="time"
                            value={timeSlot.end}
                            onChange={(e) => handleInputChange(uniqueKey, "end", e.target.value)}
                            className="px-2 py-1 ml-2 rounded"
                            placeholder="End Time"
                        />
                        <select
                            name="location"
                            value={timeSlot.location}
                            onChange={(e) => handleInputChange(uniqueKey, "location", e.target.value)}
                            className="px-2 py-1 ml-4 mb-1 rounded"
                            required
                        >
                            <option value="-">-</option>
                            <option value="Valencia">Valencia</option>
                            <option value="CCC">CCC</option>
                            <option value="Discord">Discord</option>
                        </select>
                        <button
                            type="button"
                            className="px-2 py-1 ml-4 bg-red-800 rounded transtion duration-200 hover:bg-red-600"
                            onClick={() => handleRemoveTimeSlot(uniqueKey)}
                        >
                            <b>-</b>
                        </button>
                    </div>
                )
            })}
            <button
                className="px-2 py-1 mt-2 rounded bg-neutral-700"
                type="button"
                onClick={handleAddTimeSlot}
            >
                <b>+ Add Time Slot</b>
            </button>
        </>
    );
};

export default UpdateTutorDay;