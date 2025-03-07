// API routes for CRUD operations in DB.

const express = require(`express`);
const router = express.Router();
const { pool } = require(`../../config/db.js`)

const getTutors = (req, res) => {
    pool.query(
        `SELECT * FROM tutors ORDER BY tutor_id ASC`, 
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows)
        }
    );
}

const getTutorById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        `SELECT * FROM tutors WHERE tutor_id=$1`,
        [id], 
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows[0]);
        }
    );
}

const createTutor = (req, res) => {
    const { name, email } = req.body;
    pool.query(
        `INSERT INTO tutors(name, email) VALUES ($1, $2)`, 
        [name, email], 
        (error, results) => {
            if (error) throw error;
            res.status(201).send(`Tutor added with ID ${results.insertId}`)
        }
    );     
}

const updateTutorById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query(
        `UPDATE tutors SET name=$1, email=$2 WHERE tutor_id=$3`,
        [name, email, id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send(`Tutor modified with ID ${id}`);
        }
    );
}

const deleteTutorById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        `DELETE FROM tutors WHERE tutor_id = $1`,
        [id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send(`User deleted with ID ${id}`)
        }
    );
}

const getCourses = (req, res) => {
    pool.query(
        `SELECT * FROM courses ORDER BY course_id ASC`, 
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows)
        }
    );
}

const getCourseById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        `SELECT * FROM courses WHERE course_id=$1`,
        [id], 
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows[0]);
        }
    );
}

const createCourse = (req, res) => {
    const { name, subject, number } = req.body;
    pool.query(
        `INSERT INTO courses(name, subject, number) VALUES ($1, $2, $3)`, 
        [name, subject, number], 
        (error, results) => {
            if (error) throw error;
            res.status(201).send(`Tutor added with ID ${results.insertId}`)
        }
    ); 
}

const updateCourseById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, subject, number } = req.body;
    pool.query(
        `UPDATE courses SET name=$1, subject=$2, number=$3 WHERE course_id=$4`,
        [name, subject, number, id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send(`Tutor modified with ID ${id}`);
        }
    );
}

const deleteCourseById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        `DELETE FROM courses WHERE course_id=$1`,
        [id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send(`User deleted with ID ${id}`)
        }
    );
}

const getTutorCoursesByTutorId = (req, res) => {
    const tutor_id = parseInt(req.params.id);
    pool.query(
        `SELECT c.*
        FROM tutors_courses tc
        JOIN courses c ON tc.course_id = c.course_id
        WHERE tc.tutor_id=$1`,
        [tutor_id],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    )
}

router.get(`/tutor`, getTutors);
router.get(`/tutor/:id`, getTutorById);
router.post(`/tutor/`, createTutor);
router.put(`/tutor/:id`, updateTutorById);
router.delete(`/tutor/:id`, deleteTutorById);

router.get(`/courses`, getCourses);
router.get(`/course/:id`, getCourseById);
router.post(`/course/`, createCourse);
router.put(`/course/:id`, updateCourseById);
router.delete(`/course/:id`, deleteCourseById);

router.get('/tutor/course/:id', getTutorCoursesByTutorId);

module.exports = router;    