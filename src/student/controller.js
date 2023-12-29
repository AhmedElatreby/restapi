const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.status(400).send(`${email} already exists.`);
      return;
    }

    // add student to db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) {
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(201).send(`${name} added into db seccessfully`);
      }
    );
  });
};

// delete student to db
const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  // Check if id exists
  pool.query(queries.getStudentById, [id], (error, result) => {
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.status(404).send(`${id} doesn't exist`);
      return;
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) {
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).send(`User with id: ${id} deleted seccessfully`);
    });
  });
};

// update student
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;

  // Check if id exists
  pool.query(queries.getStudentById, [id], (error, result) => {
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.status(404).send(`${id} doesn't exist`);
      return;
    }

    pool.query(
      queries.updateStudent,
      [name, email, age, dob, id],
      (error, results) => {
        if (error) {
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(200).send(`User with id: ${id} updateed seccessfully`);
      }
    );
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
