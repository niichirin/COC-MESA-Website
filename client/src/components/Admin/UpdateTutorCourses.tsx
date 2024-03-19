import { useState } from "react";
import { Course } from "./Interfaces.ts"

import CourseInput from "./CourseInput.tsx"

interface Props {
    inputCourses: Course[] | undefined;
}

const UpdateTutorCourses: React.FC<Props> = ({ inputCourses }) => {
    
    const [courses, setCourses] = useState(inputCourses);
    if(!courses) return;   

    const defaultCourse: Course = {
        course_id: 0,
        name: "",
        subject: "-",
        number: ""
    };

    const handleAddToCourses = () => {
        if (!courses || courses.length == 0) {
            setCourses([defaultCourse]);
            return
        }

        const newCourse: Course = defaultCourse;
        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
        console.log("Added a course");
    };

    const handleRemoveCourse = (key: string): void => {
        const keySplit = key.split('-'); // subject-number-index => [subject, number, index]
        const targetIndex = keySplit[2];
        setCourses(courses.filter((course, index) => index !== parseInt(targetIndex)));
    };

    return <div className="bg-neutral-800 rounded px-4 py-8">
        {!courses && <p>None</p>}
        {courses && courses.map((course, index) => {
            const uniqueKey = `${course.subject}-${course.number}-${index}`;
            return (
                <div key={uniqueKey}>
                    <CourseInput 
                        inputCourse={course}
                        handleRemoveCourse={() => handleRemoveCourse(uniqueKey)}
                    />
                </div> 
            )}
        )}
        <button 
            type="button"
            className="my-2 py-1 bg-neutral-700 rounded" 
            onClick={handleAddToCourses}
        >
            <b>+ Add Course</b>
        </button>
    </div>
}

export default UpdateTutorCourses;