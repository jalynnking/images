const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;

// Initialize multer middleware to handle file storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/api/upload-image', upload.single('image'), (req, res) => {
	if (req.file) {
		res.json({ success: true, imagePath: `/uploads${req.file.filename}` });
	} else {
		res.json({ success: false, message: 'Image upload failed' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
