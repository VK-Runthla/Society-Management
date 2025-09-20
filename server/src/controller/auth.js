const AuthModel = require("../model/auth.model.js");
const fs = require("fs");
const path = require("path");

// Register
module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNo, role } = req.body;

    const profileFile = req.files?.profile?.[0];
    const idProofFile = req.files?.idProof?.[0];

    if (!profileFile || !idProofFile) {
      return res
        .status(400)
        .json({ message: "Both profile and ID proof files are required." });
    }
    if (await AuthModel.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newUser = new AuthModel({
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      role,
      profileImg: profileFile.filename,
      idProof: idProofFile.filename,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login
module.exports.login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await AuthModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Forgot Password
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    res.send("Password reset link sent");
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error });
  }
};

// Delete account
module.exports.deleteAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await AuthModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Resolve image paths
    const profileImagePath = user.profileImg
      ? path.resolve(__dirname, "../../assets/profile", user.profileImg)
      : null;

    const idProofImagePath = user.idProof
      ? path.resolve(__dirname, "../../assets/idProof", user.idProof)
      : null;

    // Delete profile image
    if (profileImagePath && fs.existsSync(profileImagePath)) {
      await fs.promises.unlink(profileImagePath);
    }

    // Delete ID proof image
    if (idProofImagePath && fs.existsSync(idProofImagePath)) {
      await fs.promises.unlink(idProofImagePath);
    }

    // Delete user from DB
    await AuthModel.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ message: "Account and images deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Error deleting account", error });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, role } = req.body;
    const profile = req.files?.profile?.[0];
    const idProof = req.files?.idProof?.[0];

    // Update user profile
    const updatedUser = await AuthModel.findByIdAndUpdate(
      req.user.id,
      {
        firstName,
        lastName,
        email,
        phoneNo,
        role,
        profileImg: profile?.filename,
        idProof: idProof?.filename,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};
