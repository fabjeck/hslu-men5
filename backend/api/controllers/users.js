import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import junk from 'junk'

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
      user[0].image = JSON.parse(user[0].image);
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
  const { images, mail, password } = req.body;
  let stringifiedImages;
  if (images) {
    const newImages = Object.values(images).map((image) => image.split('/').pop());
    stringifiedImages = JSON.stringify(images);
    const imgPath = path.resolve(__dirname, '../../uploads/profiles');
    const files = await fs.promises.readdir(imgPath);
    const noJunk = files.filter(junk.not);
    const match = noJunk.filter((file) => file.split('-')[0] == req.userID && !newImages.includes(file));
    match.forEach((file) => {
      const img = path.join(imgPath, file);
      fs.unlink(img, (err) => {
        if (err) {
          return res.status(500).json({
            err,
          });
        };
      });
    });
  }
  let hash;
  if (password) {
    hash = await bcrypt.hash(password, 10);
  }
  try {
    const connection = await pool;
    const updateUserQuery = `UPDATE Users SET mail = '${mail}', password = COALESCE(NULLIF('${hash}', 'undefined'), password), image = NULLIF('${stringifiedImages}', 'undefined') WHERE userID = ${req.userID}`;
    await connection.query(updateUserQuery);
    const updatedUserQuery = `SELECT mail, image FROM Users WHERE userID = ${req.userID}`;
    const updatedUser = await connection.query(updatedUserQuery);
    updatedUser[0].image = JSON.parse(updatedUser[0].image);
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
    const imgPath = path.resolve(__dirname, '../../uploads/profiles');
    const files = await fs.promises.readdir(imgPath);
    const noJunk = files.filter(junk.not);
    const match = noJunk.filter((file) => file.split('-')[0] == req.userID);
    match.forEach((file) => {
      const img = path.join(imgPath, file);
      fs.unlink(img, (err) => {
        if (err) {
          return res.status(500).json({
            err,
          });
        };
      });
    });
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

async function get(req, res) {
  const { username } = req.params;
  try {
    const connection = await pool;
    const getUserQuery = `SELECT username, image AS profile, mail FROM Users WHERE username = '${username}'`;
    const userReq = connection.query(getUserQuery);
    const getPostsQuery = `SELECT postID, t1.image, title FROM Posts t1 JOIN Users t2 ON t1.userID = t2.userID WHERE t2.username = '${username}'`;
    const postsReq = connection.query(getPostsQuery);
    const getLikesQuery = `SELECT t1.postID, t1.userID FROM Likes t1 JOIN Posts t2 ON t1.postID = t2.postID JOIN Users t3 ON t2.userID = t3.userID WHERE t3.username = '${username}'`;
    const likesReq = connection.query(getLikesQuery);
    const [user, posts, likes] = await Promise.all([userReq, postsReq, likesReq]);
    if (user.length) {
      const { username, profile, mail } = user[0];
      return res.status(200).json({
        message: 'User retrieved',
        user: {
          username,
          profile: JSON.parse(profile),
          mail,
          posts: posts.map((post) => {
            const { postID, title, image } = post;
            const likesPost = likes.filter(like => like.postID === postID);
            const likesUserID = likesPost.map((like) => like.userID);
            return {
              postID,
              title,
              image: JSON.parse(image),
              likes: likesUserID,
              publisher: {
                username,
                profile: JSON.parse(profile),
              }
            }
          }),
        }
      });
    }
    return res.status(404).json({
      message: 'User not found',
    })
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export {
  signup, signin, update, del, get
};
