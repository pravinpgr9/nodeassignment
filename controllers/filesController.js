const File = require('../models/File');

// Controller function to upload a file
exports.uploadFile = async (req, res, next) => {
  try {
    // Check if req.file exists
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    // Destructure req.file properties
    const { filename, path, size } = req.file;

    // Assuming you have a user ID associated with the request
    const user = req.body.user; // Assuming user ID is provided in the request body

    // Create a new file document in the database
    const file = new File({ filename, path, size, user });
    await file.save();

    res.status(201).send({ message: 'File uploaded successfully!', file });
  } catch (error) {
    next(error);
  }
};

// Controller function to retrieve files
exports.getFiles = async (req, res, next) => {
  console.log("getFiles");
  try {
    // Check if req.user exists and contains the user ID
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID not provided.' });
    }

    const userId = req.user.id;
    const files = await File.find({ user: userId }).sort({ createdAt: -1 });

    // Check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found for the user.' });
    }

    res.status(200).json({ message: 'Files retrieved successfully!', files });
  } catch (error) {
    next(error);
  }
};



// Controller function to delete a file
exports.deleteFile = async (req, res, next) => {
  try {
    // Extract fileId from request parameters
    const { fileId } = req.params;

    // Check if fileId is provided
    if (!fileId) {
      return res.status(400).send({ message: 'File ID is required.' });
    }

    // Find and delete the file based on fileId and user
    const file = await File.findOneAndDelete({ _id: fileId });

    // Check if file exists
    if (!file) {
      return res.status(404).send({ message: 'File not found in Database.' });
    }

    // Send success response
    res.status(200).send({ message: 'File deleted successfully!', file });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
