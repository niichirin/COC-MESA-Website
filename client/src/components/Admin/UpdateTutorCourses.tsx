import { Course } from "./Interfaces.ts"

import CourseInput from "./CourseInput.tsx"

interface Props {
    courses: { [key: string]: Course } | undefined;
}

const UpdateTutorCourses: React.FC<Props> = ({ courses }) => {
    
    const handleAddCourse = () => {
        
    }

    return <form>
        <h3>Courses</h3>
        {!courses && <p>None</p>}
        {courses && Object.keys(courses).map((key, index) => 
            <>
                <CourseInput key={index} inputCourse={courses[key]}/>
                <br></br>
            </>
        )}
        <button onClick={handleAddCourse}>+ Add Course</button>
    </form>
}

export default UpdateTutorCourses;