const { verifyToken } = require("../services/authentication");

function checkAuthentication() {
  return (req, res, next) => {
    const cookie = req.cookies?.token;
    if (!cookie) {
      return next();
    }
    
    try {
        const userPayload = verifyToken(cookie);
        req.user = userPayload;
    } catch (error) {
        return res.json({ loggedIn: false });
    }
    
    return next();
  }
}

module.exports = {checkAuthentication};