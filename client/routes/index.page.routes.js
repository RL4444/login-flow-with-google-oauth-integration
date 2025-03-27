import express from "express";
import authRoutes from "./auth.page.routes.js";
import protectedRoutes from "./protected.page.routes.js";

const router = express.Router();

router.use("/", [authRoutes, protectedRoutes]);

export default router;
