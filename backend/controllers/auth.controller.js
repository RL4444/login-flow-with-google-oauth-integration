import { getUserByEmail } from "./user.controller.js";
import { passwordsMatch as checkPasswords } from "../utils/encryptPassword.js";

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  const passwordsMatch = await checkPasswords(password, user.data.password);

  if (passwordsMatch) {
    return {
      error: false,
      message: null,
    };
  } else {
    return {
      error: true,
      message: "password did not match record",
    };
  }
};
