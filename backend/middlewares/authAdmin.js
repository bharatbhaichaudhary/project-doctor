import jwt from "jsonwebtoken";

// admin authentication middlware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Aurhorizen Login Again",
      });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRT);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Aurhorizen Login Again",
      });
    }

    next()
  } catch (error) {
    console.log("authAdmin", error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
