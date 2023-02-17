const db = require('../models/models');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


const userController = {};

userController.addUser = async (req, res, next) => {
  const {username, password} = req.body;
  const hashedPass = await bcrypt.hash(password, SALT_WORK_FACTOR);
  const values = [username, hashedPass];
  const queryString = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING*;'
  const data = await db.query(queryString, values);
  res.cookie('user_id', data.rows[0]._id);
  if (data.rows[0]) res.locals.userIsValid = true;
  return next();
}

userController.verifyUser = async (req, res, next) => {
  try {
    const {username, password} = req.params;
    const values = [username];
    const queryString = 'SELECT users.password, users._id FROM users WHERE users.username = $1';
    const data = await db.query(queryString, values);
    const hashedPass = data.rows[0].password;
    const isValid = await bcrypt.compare(password, hashedPass);
    res.cookie('user_id', data.rows[0]._id);
    res.locals.userIsValid = isValid;
    return next();
  } catch (error) {
    res.locals.userIsValid = false;
    return next();
  }
}

module.exports = userController;