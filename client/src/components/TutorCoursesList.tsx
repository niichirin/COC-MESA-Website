import React from "react";

import { Course } from "./Interfaces.ts";

interface TutorCoursesListProps {
    courses: { [key: string]: Course };
}

const TutorCoursesList: React.FC<TutorCoursesListProps> = ({ courses }) => {
    // tutor teaches no courses (lol)
    if (!courses || Object.keys(courses).length === 0) return null;

    let tutorCoursesList  = "";
    Object.keys(courses).forEach((key, index) => {
        const course = courses[key];
        let currStr = "";
        if (course.number === 0) {
            // this tutor teaches all of a subject
            switch (course.subject) {
                case "MATH":
                    currStr = "All Math";
                    break;
                case "PHYSIC":
                    currStr = "All Physics";
                    break;
                case "CMPSCI":
                    currStr = "All CS";
                    break;
                case "ENGR":
                    currStr = "All Engineering";
                    break;
                case "BIOSCI":
                    currStr = "All Biology";
                    break;
                case "CHEM":
                    currStr = "All Chemistry";
                    break;
                case "ENGL":
                    currStr = "All English";
                    break;
                default:
                    break;
            }
        } else {
            // this tutor teaches this specific course
            currStr += course.subject + '-' + course.number;
        }

        // add comma if not the last item
        if (index + 1 !== Object.keys(courses).length) {
            currStr += ", ";
        }

        tutorCoursesList += currStr;
    });

    return <p><b>Courses: </b>{tutorCoursesList }</p>;
};

export default TutorCoursesList;
