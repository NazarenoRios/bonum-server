const jwt = require("jsonwebtoken");
import "dotenv/config";

const SECRET = process.env.SECRET;

const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

const validateToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export { generateToken, validateToken };
