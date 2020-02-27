const getPosts = (req, res) => {
  res.status(200).json({
    message: 'Handling GET requests to /posts',
  });
};

const createPost = (req, res) => {
  res.status(200).json({
    message: 'Handling POST requests to /posts',
  });
};

export { getPosts, createPost };
