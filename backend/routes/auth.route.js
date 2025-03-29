import express from "express";
import axios from "axios";
import { loginUser, createUser } from "../controllers/auth.controller.js";
import { issueJWT } from "../utils/jwt.js";
import fs from "fs";
import dotenv from "dotenv";
import { User } from "../../db/models/user.model.js";

dotenv.config({});

const serverURI = "http://localhost:8081";
const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_PATHNAME,
  OAUTH_TOKEN_URI,
} = process.env;
const OAUTH_REDIRECT_URI = `${serverURI}${OAUTH_REDIRECT_PATHNAME}`;

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    if (!password || !email) {
      throw new Error("Missing credentials");
    }

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

router.get("/logout", async (req, res) => {
  res.clearCookie("bearer");
  res.redirect("/login");
});

router.get("/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post(OAUTH_TOKEN_URI, {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: OAUTH_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // TODO: check if user exists in db, if not create and use isGoogleAuth as flag and persist
    let user = await User.findOne({ where: { email: profile.email } });

    const newUser = {
      email: profile.email,
      password: null,
      needsEmailConfirmation: false,
      confirmationToken: false,
      isGoogleAuth: true,
    };

    if (!user.dataValues) {
      user = await User.create(newUser);
    }

    res.cookie("bearer", await issueJWT(newUser), {
      maxAge: 900000,
      httpOnly: true,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error:", `${error}`);
    res.redirect("/login");
  }
});

export default router;
