import sharp from 'sharp';
import path from 'path';

async function transformer(file, { width, height }, filePathAndName) {
  return await sharp(file.buffer)
    .resize(width, height)
    .webp({ lossless: true })
    .toFile(filePathAndName);
};

export default function imageResize(sizes, filePath) {
  return async (req, res, next) => {
    if (req.file) {
      let images = {};
      try {
        for (const size in sizes) {
          const name = `${req.userID}-${Date.now()}-${sizes[size].width}.webg`;
          const filePathAndName = path.resolve(__dirname, `../uploads/${filePath}/${name}`);
          await transformer(req.file, sizes[size], filePathAndName);
          images[sizes[size].width] = `http://localhost:8080/static/${path.join(filePath, name)}`;
        }
        req.body.images = images;
        next();
      } catch (error) {
        return res.status(500).json({
          error: 'Failed to resize image'
        });
      }
    } else {
      next();
    }
  }
};