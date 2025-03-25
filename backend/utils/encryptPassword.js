import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const saltRounds = Number(process.env.SALT_ROUNDS);

export const encryptPassword = (plainTextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
  return hashedPassword;
};

export const passwordsMatch = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
