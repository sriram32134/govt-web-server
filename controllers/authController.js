const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT,
});

// 🔹 In-memory OTP store (dev only)
const otpCache = {};

// IMAGEKIT AUTH
exports.getIKAuth = (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
};

