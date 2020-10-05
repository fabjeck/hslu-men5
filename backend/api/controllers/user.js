import bcrypt from 'bcrypt';
import pool from '../../db/db-connector';

import evaluateSanitization from '../utils/sanitize';
import tokenFactory from '../utils/token';

async function signup(req, res) {
  evaluateSanitization(req, res);
  const { username, mail, password } = req.body;
  try {
    const connection = await pool;
    const getUserQuery = `SELECT EXISTS(SELECT * FROM Users WHERE username = '${username}') AS isExisting`;
    const user = await connection.query(getUserQuery);
    if (user[0].isExisting) {
      return res.status(409).json({
        message: 'User exists already',
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const addUserQuery = `INSERT INTO Users (username, mail, password) VALUES ('${username}', '${mail}', '${hash}')`;
    const { insertId } = await connection.query(addUserQuery);
    const retrieveUserQuery = `SELECT userID, username, mail, image FROM Users WHERE userID = ${insertId}`;
    const addedUser = await connection.query(retrieveUserQuery);
    const payload = {
      userID: addedUser[0].userID,
      username: addedUser[0].username,
    };
    const token = tokenFactory(payload, res);
    return res.status(201).json({
      message: 'User created',
      user: addedUser[0],
      token,
      tokenExpiry: process.env.JWT_EXPIRY,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}

async function signin(req, res) {
  evaluateSanitization(req, res);
  const { username, password } = req.body;
  try {
    const connection = await pool;
    const findUserQuery = `SELECT * FROM Users WHERE username = '${username}'`;
    const user = await connection.query(findUserQuery);
    if (!user[0]) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      const payload = {
        userID: user[0].userID,
        username: user[0].username,
      };
      const token = tokenFactory(payload, res);
      delete user[0].password;
      return res.status(200).json({
        message: 'Auth successfull',
        user: user[0],
        token,
        tokenExpiry: process.env.JWT_EXPIRY,
      });
    }
    return res.status(401).json({
      message: 'Auth failed',
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}

async function update(req, res) {
  evaluateSanitization(req, res);
  const { mail, image, password } = req.body;
  let hash;
  if (password) {
    hash = await bcrypt.hash(password, 10);
  }
  try {
    const connection = await pool;
    const updateUserQuery = `UPDATE Users SET mail = '${mail}', password = COALESCE(NULLIF('${hash}', 'undefined'), password), image = COALESCE(NULLIF('${image}', ''), image) WHERE userID = ${req.userID}`;
    await connection.query(updateUserQuery);
    const updatedUserQuery = `SELECT mail, image FROM Users WHERE userID = ${req.userID}`;
    const updatedUser = await connection.query(updatedUserQuery);
    return res.status(200).json({
      message: 'User profil updated',
      user: updatedUser[0],
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}

// 'delete' is a JS keyword
async function del(req, res) {
  try {
    const connection = await pool;
    const deleteUser = `DELETE FROM Users WHERE userID = '${req.userID}'`;
    await connection.query(deleteUser);
    return res.status(200).json({
      message: 'User profil deleted',
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}

export {
  signup, signin, update, del,
};
