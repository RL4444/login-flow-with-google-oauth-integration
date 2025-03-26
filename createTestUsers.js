import db from "./db/index.js";
import fs from "fs";
import { User } from "./db/models/user.model.js";
import { encryptPassword } from "./backend/utils/encryptPassword.js";

const createTestUsers = async () => {
  // force sequelize to run the model before creating users
  await db.sync({ force: true });
  const users = [
    {
      email: "user1@gmail.com",
      password: "user1",
      needsEmailConfirmation: false,
      confirmationToken: null,
    },
    {
      email: "user2@gmail.com",
      password: "user2",
      needsEmailConfirmation: false,
      confirmationToken: null,
    },
    {
      email: "user3@gmail.com",
      password: "user3",
      needsEmailConfirmation: false,
      confirmationToken: null,
    },
    {
      email: "user4@gmail.com",
      password: "user4",
      needsEmailConfirmation: false,
      confirmationToken: null,
    },
  ];

  for (let i = 0; i < users.length; i++) {
    const currentUser = { ...users[i] };
    currentUser.password = encryptPassword(currentUser.password);
    const upsertResult = await User.upsert(currentUser, currentUser.email);
    console.log({ upsertResult });
  }

  const result = await User.findAll();
  fs.writeFileSync(
    "./testUsers.json",
    JSON.stringify({
      "the following users have been placed in your db with their passwords encrypted":
        users,
    })
  );
  console.log({ result });
};

createTestUsers();
