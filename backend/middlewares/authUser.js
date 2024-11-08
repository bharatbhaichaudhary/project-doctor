import jwt from "jsonwebtoken";

// admin authentication middlware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Aurhorizen Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRT);

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("authUser", error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
