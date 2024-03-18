import { useState } from "react";
import { Course } from "./Interfaces.ts"

import CourseInput from "./CourseInput.tsx"

interface Props {
    courses: { [key: string]: Course } | undefined;
}

const UpdateTutorCourses: React.FC<Props> = ({ courses }) => {
    
    const [coursesState, setCoursesState] = useState(courses);
    
    const handleAddToCourses = () => {
    }

    return <div className="bg-neutral-800 rounded px-4 py-2">
        <h3 className="font-bold mb-2">Courses</h3>
        {!courses && <p>None</p>}
        {courses && Object.keys(courses).map((key, index) => 
            <>
                <CourseInput key={index} inputCourse={courses[key]}/>
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