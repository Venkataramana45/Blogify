const { profile } = require("console");
const JWT = require("jsonwebtoken");

// Read JWT secret from environment for production safety. Falls back to a default
// string when not provided (useful for quick local testing but replace in prod).
const secret = process.env.JWT_SECRET || "SECRET_KEY_BLOGGER";

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    fullName: user.fullName,
    role: user.role,
  };
  // Consider adding an expiration (e.g. { expiresIn: '30d' }) if desired
  const token = JWT.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  try {
    const decoded = JWT.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
