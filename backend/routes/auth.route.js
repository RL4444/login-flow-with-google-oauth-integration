import express from "express";
import { loginUser } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    const response = await loginUser(email, password);
    if (response.error) {
      res
        .status(400)
        .json({ error: true, statusCode: "400", message: response.message });
      return;
    }

    res.status(200).json({ error: true, statusCode: "200", message: null });
    return;
  } catch (err) {
    res.status(500).json({ error: true, statusCode: "500", message: err });
    return;
  }
});

router.post("/logout", async (req, res) => {
  //
});

export default router;
