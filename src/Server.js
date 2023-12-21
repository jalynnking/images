const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const cors = require('cors');
const PORT = 3001;

// Array to store images
const uploadedImages = [];

// Set up storage for uploaded images
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: async (req, file, cb) => {
		const originalFilename = file.originalname;
		let filename = originalFilename;

		// Check if the filename already exists, if true add incrementing number to end
		let counter = 1;
		while (uploadedImages.some((img) => img.filename === filename)) {
			const [name, extension] = originalFilename.split('.');
			filename = `${name}-${counter}.${extension}`;
			counter++;
		}

		const filePath = path.join('uploads', filename);
		uploadedImages.push({ filename, path: `/uploads/${filename}` });
		cb(null, filename);
	},
});

// Multer middleware for file storage
const upload = multer({ storage });

// Serve uploaded images statically from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Cors header
app.use(cors());

// GET all images
app.get('/api/images', (req, res) => {
	res.json(uploadedImages);
});

// POST upload image
app.post('/api/images', upload.single('image'), (req, res) => {
	if (req.file) {
		res.json({ success: true, message: 'Image uploaded successfully' });
	} else {
		res.json({ success: false, message: 'Image upload failed' });
	}
});

// DELETE delete image by filename
app.delete('/api/images/:filename', async (req, res) => {
	const { filename } = req.params;
	const index = uploadedImages.findIndex((img) => img.filename === filename);

	if (index !== -1) {
		const imagePath = path.join(__dirname, 'uploads', filename);
		await fs.unlink(imagePath);
		uploadedImages.splice(index, 1);
		res.json({ success: true, message: 'Image deleted successfully' });
	} else {
		res.json({ success: false, message: 'Image not found' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
