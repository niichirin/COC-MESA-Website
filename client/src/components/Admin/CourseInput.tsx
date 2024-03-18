import { useState } from 'react';

import { Course } from "./Interfaces.ts";

interface Props {
  inputCourse: Course;
  handleRemoveCourse: () => void;
}

const CourseInput: React.FC<Props> = ({ 
  inputCourse, 
  handleRemoveCourse 
}) => {

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
        <b>Subject:</b>
        <select
          name="subject"
          value={course.subject}
          onChange={handleChange}
          className="px-2 py-1 ml-2 mb-1 rounded"
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
      <label className="ml-4">
        <b>Number:</b>
        <input
          type="text"
          name="number"
          value={course.number}
          onChange={handleChange}
          maxLength={3}
          pattern="\d{1,3}"
          title="Please enter a three-digit number"
          className="px-2 py-1 ml-2 mb-1 rounded w-20"
          required
        />
      </label>
      <button
        type="button"
        className="px-2 py-1 ml-4 bg-red-800 rounded transition duration-200 hover:bg-red-600"
        onClick={handleRemoveCourse}
      >
        <p className="font-bold">-</p>
      </button>
    </>
  );
};

export default CourseInput;
