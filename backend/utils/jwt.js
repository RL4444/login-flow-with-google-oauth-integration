import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const issueJWT = async (userInfo) => {
  const user = { ...userInfo };
  delete user.password;

  const token = jwt.sign({ user }, SECRET_KEY, {
    expiresIn: "6h",
  });

  return token;
};

export const checkJWT = async (token) => {
  const isValid = jwt.verify(token, SECRET_KEY);
  return isValid;
};
