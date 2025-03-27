import { getUserByEmail, upsertUser } from "./user.controller.js";
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

export const createUser = async (email, password) => {
  const userAlreadyExists = await getUserByEmail(email);

  if (userAlreadyExists && userAlreadyExists.data) {
    return {
      error: true,
      message: "User already exists",
      status: 409,
    };
  }

  try {
    const newUser = await upsertUser({ email, password });
    if (newUser && newUser.data) {
      return {
        error: false,
        message: null,
        status: 200,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err,
      status: 400,
    };
  }
};
