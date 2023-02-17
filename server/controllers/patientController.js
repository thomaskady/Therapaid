const db = require('../models/models');

const patientController = {};

patientController.addPatient = async (req, res, next) => {
  const { user_id } = req.cookies;
  const { firstName, lastName } = req.body;
  const values = [firstName, lastName];
  const queryString =
    'INSERT INTO patients(firstname, lastname) VALUES($1, $2) RETURNING*;';
  const data = await db.query(queryString, values);
  console.log(data);
  res.locals.newPatient = data.rows[0];
  const patientId = data.rows[0]._id;
  const userValues = [patientId, user_id];
  const userQueryString =
    'UPDATE users SET patients = array_append(patients, $1) WHERE users._id = $2 RETURNING*;';
  const userData = await db.query(userQueryString, userValues);
  return next();
};

patientController.findPatients = async (req, res, next) => {
  const { user_id } = req.cookies;
  const values = [user_id];
  const queryString = 'SELECT users.patients FROM users WHERE users._id = $1;';
  const data = await db.query(queryString, values);
  const patientsIdList = data.rows[0].patients;
  const patientsList = [];
  if (patientsIdList) {
    for (const id of patientsIdList) {
      const idValue = [id];
      const patientQueryString = 'SELECT * FROM patients WHERE patients._id = $1';
      const patient = await db.query(patientQueryString, idValue);
      patientsList.push(patient.rows[0]);
    }
  }
  res.locals.patientsList = patientsList;
  return next();
};

module.exports = patientController;
