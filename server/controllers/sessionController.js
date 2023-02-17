const db = require('../models/models');

const sessionController = {};

sessionController.addSession = async (req, res, next) => {
  const { patient_id, start_time, end_time, day } = req.body;
  const values = [patient_id, start_time, end_time, day];
  const queryString =
    'INSERT INTO sessions(patient_id, start_time, end_time, day) VALUES($1, $2, $3, $4) RETURNING*;';
  const data = await db.query(queryString, values);
  console.log(data.rows[0]);
  const sessionId = data.rows[0]._id;
  const updatePatientValues = [sessionId, patient_id];
  const updatePatientQueryString =
    'UPDATE patients SET sessions = array_append(sessions, $1) WHERE patients._id = $2 RETURNING*;';
  const updatedPatient = await db.query(
    updatePatientQueryString,
    updatePatientValues
  );
  console.log(updatedPatient);
  return next();
};

sessionController.getDaySessions = async (req, res, next) => {
  const { day, month, year } = req.params;
  console.log(day, month, year);
  const date = [month, day, year].join('/');
  console.log(date);
  const userId = req.cookies.user_id;
  const values = [userId, date];
  console.log(userId);
  const queryString =
    'SELECT users._id AS user_id, patients.firstname, patients.lastname, sessions.start_time, sessions.end_time, sessions._id FROM users JOIN patients ON patients._id::varchar = ANY(users.patients) JOIN sessions ON sessions._id::varchar = ANY(patients.sessions) WHERE users._id = $1 AND sessions.day = $2;';
  const data = await db.query(queryString, values);
  res.locals.sessionList = data.rows;
  return next();
};

module.exports = sessionController;
