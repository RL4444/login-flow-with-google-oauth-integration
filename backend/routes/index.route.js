import express from "express";
import AuthRoutes from "./auth.route.js";
import UserRoutes from "./user.route.js";

const routes = express.Router();
routes.use("/auth", AuthRoutes);
routes.use("/user", UserRoutes);

export default routes;
