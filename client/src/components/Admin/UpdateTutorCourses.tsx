import { useState } from "react";
import { Course } from "./Interfaces.ts"

import CourseInput from "./CourseInput.tsx"

interface Props {
    courses: { [key: string]: Course } | undefined;
}

const UpdateTutorCourses: React.FC<Props> = ({ courses }) => {
    
    const [coursesState, setCoursesState] = useState(courses);
    
    const handleAddToCourses = () => {
        if (!coursesState) return;

        const newCourseId = Object.keys(coursesState).length - 1;
        const lastCourse = coursesState[newCourseId];
        const newCourse: Course = {
            course_id: lastCourse.course_id,
            name: lastCourse.name,
            subject: lastCourse.subject,
            number: lastCourse.number
        };

        const newCourses = { 
            ...coursesState, 
            [newCourseId + 1]: newCourse 
        };
        
        setCoursesState(newCourses);
    };

    return <div className="bg-neutral-800 rounded px-4 py-2">
        <h3 className="font-bold mb-2">Courses</h3>
        {!coursesState && <p>None</p>}
        {coursesState && Object.keys(coursesState).map((key, index) => 
            <>
                <CourseInput key={index} inputCourse={coursesState[key]}/>
                <br></br>
            </>
        )}
        <button 
            type="button"
            className="bg-neutral-700 rounded" 
            onClick={handleAddToCourses}
        >
            + Add Course
        </button>
    </div>
}

export default UpdateTutorCourses;