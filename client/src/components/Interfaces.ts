// template of PSQL database

export interface Course {
    course_id: number;
    subject: string; // MATH
    number: string | number; // 215
    name: string; // Differential Equations
}

export interface Day {
    start: string;
    end: string;
    location: string;
}

export interface Tutor {
    tutor_id: number;
    name: string; // John Doe
    email: string;
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