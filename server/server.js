const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const patientController = require('./controllers/patientController');
const sessionController = require('./controllers/sessionController');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get(
  '/api/users/:username&:password',
  userController.verifyUser,
  (req, res) => {
    res.status(200).json(res.locals.userIsValid);
  }
);

app.post('/api/users', userController.addUser, (req, res) => {
  res.status(200).json(res.locals.userIsValid);
});

app.get('/api/patients', patientController.findPatients, (req, res) => {
  res.status(200).json(res.locals.patientsList);
});

app.post('/api/patients', patientController.addPatient, (req, res) => {
  res.status(200).send(res.locals.newPatient);
});

app.get('/api/sessions/:month&:day&:year', sessionController.getDaySessions, (req, res) => {
  res.status(200).json(res.locals.sessionList);
})

app.post('/api/sessions', sessionController.addSession, (req, res) => {
  res.status(200).send('sessionsuccess');
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
