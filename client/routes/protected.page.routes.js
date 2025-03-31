import express from "express";
import checkAuth from "../../backend/middlewares/index.middleware.js";
import { decode } from "jsonwebtoken";
const pageRouter = express.Router();

// TODO: add middleware to check JWT

pageRouter.get("/dashboard", checkAuth, async (req, res) => {
  const user = decode(req.cookies["bearer"]);
  res.render("dashboard", {
    title: "Dashboard - Welcome User",
    layout: "main",
    email: user.user.dataValues.email,
  });
});

pageRouter.get("/settings", checkAuth, async (req, res) => {
  const { user } = decode(req.cookies["bearer"]);
  user.dataValues.password = "this iss a fake password";
  res.render("settings", {
    title: `${user.dataValues.email} Settings`,
    layout: "main",
    user: user.dataValues,
  });
});

export default pageRouter;
