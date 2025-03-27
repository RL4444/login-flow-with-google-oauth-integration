import { User } from "../../db/models/user.model.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import handleErr from "../utils/index.js";

export const getUser = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return { data: user, error: false, message: null };
  } catch (error) {
    const payload = handleErr(error);
    return payload;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return { data: user, error: false, message: null };
  } catch (error) {
    const payload = handleErr(error);
    return payload;
  }
};

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    return { data: users, error: false, message: null };
  } catch (error) {
    const payload = handleErr(error);
    return payload;
  }
};

export const upsertUser = async (user) => {
  try {
    const {
      password,
      email,
      needsEmailConfirmation = false,
      confirmationToken = null,
    } = user;

    if (!password || !email) {
      const payload = handleErr("Missing password or email for user create");
      return payload;
    }

    const userUpserted = await User.upsert({
      email,
      password: encryptPassword(password),
      needsEmailConfirmation,
      confirmationToken,
    });

    return {
      data: userUpserted,
      error: false,
      message: null,
    };
  } catch (error) {
    const payload = handleErr(error);
    return payload;
  }
};

export default { getUser, getUsers, upsertUser };
