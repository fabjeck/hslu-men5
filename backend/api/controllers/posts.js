import pool from '../../db/db-connector';
import evaluateSanitization from '../utils/sanitize';

async function post(req, res) {
  evaluateSanitization(req, res);
  const { title, images } = req.body;
  const stringifiedImages = JSON.stringify(images);
  try {
    const connection = await pool;
    const addPostQuery = `INSERT INTO Posts (title, image, userID) VALUES ('${title}', '${stringifiedImages}', '${req.userID}')`;
    await connection.query(addPostQuery);
    return res.status(200).json({
      message: 'Post created',
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

export { post }