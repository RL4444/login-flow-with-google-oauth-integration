import express from "express";
import checkAuth from "../../backend/middlewares/index.middleware.js";
const pageRouter = express.Router();

// TODO: add middleware to check JWT

pageRouter.get("/dashboard", checkAuth, async (req, res) => {
  res.render("dashboard", {
    title: "Dashboard - Welcome User",
    layout: "main",
  });
});

export default pageRouter;
