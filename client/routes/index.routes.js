import express from "express";
import authRoutes from "./auth.routes.js";
import protectedRoutes from "./protected.routes.js";

const router = express.Router();

router.use("/", [authRoutes, protectedRoutes]);

export default router;
