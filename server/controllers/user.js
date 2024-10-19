const User = require('../models/User');

// Get user details
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('ridesCreated ridesJoined').lean();
    const { email, password, updatedAt, ...detail } = user;
    res.status(200).json(detail);
  } catch (err) {
    next(err);
  }
};

// Get all users
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Update user
module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, phoneNumber, profilePicture, age, profile } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          phoneNumber,
          profilePicture,
          age,
          profile
        }
      },
      { new: true, select: '-password' }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
module.exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};