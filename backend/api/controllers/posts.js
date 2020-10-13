import pool from '../../db/db-connector';
import evaluateSanitization from '../utils/sanitize';

async function create(req, res) {
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

async function get(req, res) {
  try {
    const connection = await pool;
    const getPostsQuery = 'SELECT t1.postID, t1.title, t1.image, t2.username, t2.image AS profile FROM Posts t1 JOIN Users t2 ON t1.userID = t2.userID';
    const postsReq = connection.query(getPostsQuery);
    const getLikesQuery = 'SELECT userID, postID FROM Likes';
    const likesReq = connection.query(getLikesQuery);
    const [posts, likes] = await Promise.all([postsReq, likesReq]);
    return res.status(200).json({
      message: 'Posts retrieved',
      posts: posts.map((item) => {
        const { postID, title, image, username, profile } = item;
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
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getSingle(req, res) {
  const { image } = req.params;
  try {
    const connection = await pool;
    const getPostQuery = `SELECT t1.title, t1.image, t2.username, t2.image AS profile FROM Posts t1 JOIN Users t2 ON t1.userID = t2.userID WHERE t1.title = '${image}'`;
    const result = await connection.query(getPostQuery);
    if (result.length) {
      return res.status(200).json({
        message: 'Post retrieved',
        post: result.map((props) => {
          const { title, image, username, profile } = props;
          return {
            title,
            image: JSON.parse(image),
            publisher: {
              username,
              profile: JSON.parse(profile),
            }
          }
        }),
      });
    }
    return res.status(404).json({
      message: 'Post not found',
    })
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

async function toggleLike(req, res) {
  const { isLiked } = req.body;
  const { postID } = req.params;
  try {
    const connection = await pool;
    if (isLiked) {
      const isLikedQuery = `SELECT * FROM Likes WHERE postID = '${postID}' AND userID = '${req.userID}'`;
      const isAlreadyLiked = await connection.query(isLikedQuery);
      if (isAlreadyLiked.length) {
        return res.status(400).json({
          error: 'Post is already liked by this user',
        });
      }
      const likeQuery = `INSERT INTO Likes (postID, userID) VALUES ('${postID}', '${req.userID}')`;
      await connection.query(likeQuery);
    } else {
      const dislikeQuery = `DELETE FROM Likes WHERE postID = '${postID}' AND userID = '${req.userID}'`;
      await connection.query(dislikeQuery);
    }
    return res.status(200).json({
      message: 'Like was toggled'
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

export { create, get, getSingle, toggleLike }