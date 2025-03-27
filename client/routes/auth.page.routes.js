import express from "express";
const pageRouter = express.Router();

pageRouter.get("/login", async (req, res) => {
  res.render("login.handlebars", {
    title: "Login to your account",
    layout: "main",
  });
});

pageRouter.get("/create-account", async (req, res) => {
  res.render("signup.handlebars", {
    title: "Create your new account",
    layout: "main",
  });
});

export default pageRouter;
