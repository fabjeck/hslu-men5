import sharp from 'sharp';

async function transformer(file, { width, height }, filePathAndName) {
  await sharp(file.buffer)
    .resize(width, height)
    .webp({ lossless: true })
    .toFile(filePathAndName);
};

export default function imageResize(sizes, filePath, fileName) {
  return async (req, res, next) => {
    let filePathAndName;
    try {
      sizes.forEach(async (size) => {
        filePathAndName = `/uploads/${filePath}/${fileName}-${size.width}`;
        await transformer(req.file, size, filePathAndName);
      });
      req.body.image.push(filePathAndName);
      next();
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to resize image'
      });
    }
  };
};