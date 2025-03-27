import express from "express";
const pageRouter = express.Router();

// TODO: add middleware to check JWT

pageRouter.get("/dashboard", async (req, res) => {
  res.render("dashboard", {
    title: "Dashboard - Welcome User",
    layout: "main",
  });
});

export default pageRouter;
