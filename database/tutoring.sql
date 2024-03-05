-- CREATE TABLE tutors (
--   tutor_id SERIAL PRIMARY KEY,
--   name VARCHAR(50) NOT NULL,
--   email VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE courses (
--   course_id SERIAL PRIMARY KEY,
--   name VARCHAR(50) NOT NULL,
--   subject VARCHAR(10) NOT NULL,
--   number INT NOT NULL
-- );

-- CREATE TABLE tutors_courses (
--   tutors_courses_id SERIAL PRIMARY KEY,
--   tutor_id INT NOT NULL,
--   course_id INT NOT NULL,
--   CONSTRAINT fk_tutor_id FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id),
--   CONSTRAINT fk_course_id FOREIGN KEY (course_id) REFERENCES courses(course_id),
--   CONSTRAINT unique_tutor_course_pair UNIQUE (tutor_id, course_id)
-- );

-- CREATE TABLE days (
--   day_num INT PRIMARY KEY NOT NULL,
--   day_name VARCHAR(10) NOT NULL
-- );

-- INSERT INTO days (day_num, day_name)
-- VALUES 
--   (0, 'Sunday'),
--   (1, 'Monday'),
--   (2, 'Tuesday'),
--   (3, 'Wednesday'),
--   (4, 'Thursday'),
--   (5, 'Friday'),
--   (6, 'Saturday');

-- CREATE TABLE schedule (
--   schedule_id SERIAL PRIMARY KEY,
--   tutors_courses_id INT NOT NULL,
--   day_of_week INT NOT NULL,
--   start_time TIME NOT NULL,
--   end_time TIME NOT NULL,
--   CONSTRAINT fk_tutors_courses_id FOREIGN KEY (tutors_courses_id) REFERENCES tutors_courses(tutors_courses_id)
-- );

CREATE TYPE day_type AS (
    start_time TIME,
    end_time TIME,
    online BOOLEAN
);

CREATE TABLE tutors (
  tutor_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  schedule JSONB
);

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  subject VARCHAR(10) NOT NULL,
  number INT NOT NULL
);

CREATE TABLE tutors_courses (
  tutors_courses_id SERIAL PRIMARY KEY,
  tutor_id INT NOT NULL,
  course_id INT NOT NULL,
  CONSTRAINT fk_tutor_id FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id),
  CONSTRAINT fk_course_id FOREIGN KEY (course_id) REFERENCES courses(course_id),
  CONSTRAINT unique_tutor_course_pair UNIQUE (tutor_id, course_id)
);