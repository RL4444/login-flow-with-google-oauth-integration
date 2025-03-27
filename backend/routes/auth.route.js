import express from "express";
import { loginUser, createUser } from "../controllers/auth.controller.js";
import { issueJWT } from "../utils/jwt.js";
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

    res.cookie("bearer", await issueJWT(response.data), {
      maxAge: 900000,
      httpOnly: true,
    });
    res.status(200).json({
      error: false,
      statusCode: "200",
      message: null,
      token: issueJWT(response.data),
    });
    return;
  } catch (err) {
    res.status(500).json({ error: true, statusCode: "500", message: err });
    return;
  }
});

router.post("/create-account", async (req, res) => {
  const { password, email } = req.body;

  try {
    const response = await createUser(email, password);
    if (response.error) {
      if (response.status === 409) {
        res
          .status(409)
          .json({ error: true, statusCode: "409", message: response.message });
        return;
      }

      res
        .status(400)
        .json({ error: true, statusCode: "400", message: response.message });
      return;
    }

    res.cookie("bearer", await issueJWT(response.data), {
      maxAge: 900000,
      httpOnly: true,
    });
    res.status(200).json({
      error: false,
      statusCode: "200",
      message: null,
      token: issueJWT(response.data),
    });
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
