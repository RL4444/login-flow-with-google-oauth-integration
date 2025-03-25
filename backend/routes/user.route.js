import express from "express";
import { getUser, upsertUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", async () => {
  try {
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  const user = req.body;
  return await getUser(user.id);
});

router.post("/", async (req, res) => {
  const user = req.body;
  return await upsertUser(user);
});

router.patch("/:id", async (req, res) => {
  const user = req.body;
  return await upsertUser(user);
});

// router.delete("/:id", async () => {});

export default router;
