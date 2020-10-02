import bcrypt from 'bcrypt';
import pool from '../../db/db-connector';

import evaluateSanitization from '../utils/sanitize';
import { generateRefreshToken, generateToken } from '../utils/token';
import tokenStore from './token';

const signup = async (req, res) => {
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
    const retrieveUserQuery = `SELECT * FROM Users WHERE userID = '${insertId}'`;
    const addedUser = await connection.query(retrieveUserQuery);
    const refreshToken = generateRefreshToken(addedUser[0]);
    const token = generateToken(addedUser[0]);
    tokenStore.add(refreshToken);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Set-Cookie', `token=${refreshToken}; Secure; HttpOnly`);
    return res.status(201).json({
      message: 'User created',
      token,
      tokenExpiry: process.env.JWT_EXPIRY,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const signin = async (req, res) => {
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
      const refreshToken = generateRefreshToken(user[0]);
      const token = generateToken(user[0]);
      tokenStore.add(refreshToken);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Set-Cookie', `token=${refreshToken}; Secure; HttpOnly`);
      return res.status(200).json({
        message: 'Auth successfull',
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
};

const update = async (req, res) => {
  evaluateSanitization(req, res);
  const { userID } = req.params;
  const { mail, image, password } = req.body;
  try {
    const connection = await pool;
    const updateUser = `UPDATE Users SET mail = '${mail}', password = '${password}', image = '${image}' WHERE userID = '${userID}'`;
    await connection.query(updateUser);
    return res.status(200).json({
      message: 'User profil updated',
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

// 'delete' is a JS keyword
const del = async (req, res) => {
  const { userID } = req.params;
  try {
    const connection = await pool;
    const deleteUser = `DELETE FROM Users WHERE userID = '${userID}'`;
    await connection.query(deleteUser);
    return res.status(200).json({
      message: 'User profil deleted',
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

export {
  signup, signin, update, del,
};
