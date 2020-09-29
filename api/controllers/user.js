import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import pool from '../../db/db-connector';

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, mail, password } = req.body;
  try {
    const connection = await pool;
    const userQuery = `SELECT EXISTS(SELECT * FROM Users WHERE username = '${username}') AS isExisting`;
    const user = await connection.query(userQuery);
    if (user[0].isExisting) {
      return res.status(409).json({
        message: 'User exists already',
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const addUser = `INSERT INTO Users (username, mail, password) VALUES ('${username}', '${mail}', '${hash}')`;
    await connection.query(addUser);
    return res.status(201).json({
      message: 'User created',
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, password } = req.body;
  try {
    const connection = await pool;
    const findUser = `SELECT * FROM Users WHERE username = '${username}'`;
    const user = await connection.query(findUser);
    if (!user[0]) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      const token = jwt.sign(
        {
          userID: user[0].userID,
        },
        process.env.JWT_SECRET,
        {
          algorithm: 'HS256',
          expiresIn: '1h',
        },
      );
      return res.status(200).json({
        message: 'Auth successfull',
        token,
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
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
