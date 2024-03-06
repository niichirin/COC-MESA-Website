// template of PSQL database

interface Course {
    course_id: number;
    subject: string; // MATH
    number: number; // 215
    name: string; // Differential Equations
}

interface Day {
    start: string;
    end: string;
    location: string;
}

interface Tutor {
    tutor_id: number;
    name: string; // John Doe
    courses: Course[];
    schedule: {
        mon: Day[],
        tue: Day[],
        wed: Day[],
        thu: Day[],
        fri: Day[],
        sat: Day[],
        sun: Day[], 
    };
}