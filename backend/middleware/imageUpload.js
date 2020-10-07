import multer from 'multer';

const multerStorage = multer.memoryStorage();

function multerFilter(req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('File provided is not an image', false);
  }
};

const instance = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1000 * 1000
  }
});

const upload = instance.single('image');

export default (req, res, next) => {
  upload(req, res, (err) => {
    return res.status(500).json({
      error: err,
    });
  });
  next();
}