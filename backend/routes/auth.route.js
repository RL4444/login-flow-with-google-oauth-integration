import express from "express";
import { encryptPassword } from "../utils/encryptPassword.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const saltedPassword = encryptPassword(password);
});

router.post("/logout"),
  async (req, res) => {
    //
  };

export default router;
