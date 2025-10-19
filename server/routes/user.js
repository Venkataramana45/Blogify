const {Router} = require('express');
const User = require('../models/user');
const {verifyToken} = require('../services/authentication');


const router = Router();

router.post('/register', async (req, res) => {
  const {fullName, email, password} = req.body;
  try {
    const user = new User({fullName, email, password});
    await user.save();
    return res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.post('/login', async (req, res) => {
  const {email, password} = req.body;
   try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie('token', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'Lax',
      }).status(200).json({ success: true, message: 'User registered successfully' });
   } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
   }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out" });
});



router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ loggedIn: false });
    }

    const decoded = verifyToken(token);

    return res.status(200).json({
      loggedIn: true,
      user: { id: decoded.id, email: decoded.email, fullName: decoded.fullName  },
    });
  } catch (error) {
    return res.status(401).json({ loggedIn: false });
  }
});




module.exports = router;