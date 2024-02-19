const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');

const upload = require('../multerConfig');


router.post('/', upload.single('file'), filesController.uploadFile);


// Route for retrieving files
router.get('/', filesController.getFiles);

// Route for deleting a file
router.delete('/:fileId', filesController.deleteFile);

module.exports = router;
