import { useState } from 'react';

import { Course } from "./Interfaces.ts";

interface Props {
  inputCourse: Course;
}

const CourseInput : React.FC<Props> = ({ inputCourse }) => {

  const [course, setCourse] = useState<Course>(inputCourse);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(course);
//     setCourse({ course_id: inputCourse.course_id, name: '', subject: '', number: 0});
//   };

  return (
    <>
      {/* <label>
        Name:
        <input
          type="text"
          name="name"
          value={course.name}
          onChange={handleChange}
          required
        />
      </label> */}
      <label>
        Subject:
        <select
          name="subject"
          value={course.subject}
          onChange={handleChange}
          className="p-1 ml-1 mb-1 rounded"
          required
        >
          <option value="">-</option>
          <option value="MATH">MATH</option>
          <option value="PHYSIC">PHYSIC</option>
          <option value="CMPSCI">CMPSCI</option>
          <option value="ENGR">ENGR</option>
          <option value="BIOSCI">BIOSCI</option>
          <option value="CHEM">CHEM</option>
          <option value="ENGL">ENGL</option>
          <option value="PHILOS">PHILOS</option>
        </select>
      </label>
      <label className="ml-3">
        Number:
        <input
          type="text"
          name="number"
          value={course.number}
          onChange={handleChange}
          maxLength={3}
          pattern="\d{1,3}"
          title="Please enter a three-digit number"
          className="p-1 ml-1 mb-1 rounded w-10"
          required
        />
      </label>
    </>
  );
};

export default CourseInput;
