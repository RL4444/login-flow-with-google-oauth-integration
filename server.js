import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";

import apiRoutes from "./backend/routes/index.route.js";
import authPages from "./client/routes/auth.routes.js";

// https://stackoverflow.com/questions/64383909/dirname-is-not-defined-error-in-node-js-14-version
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hbs = exphbs.create({
  partialsDir: path.resolve(__dirname + "/client/views/partials/"),
});
const isDev = process.env.PORT ? false : true;
const PORT = isDev ? 8081 : process.env.PORT;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "client/views"));

// middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
app.use(express.json()); // for application/json
app.use(compression());
app.use(cookieParser());

// serve static files form /public
app.use(express.static(path.join(__dirname, "client/public"))); //

// API routes under current version
app.use("/api/v1", apiRoutes);

// pages
app.use("/", authPages);

app.get("/test", async (req, res, next) => {
  res.json({
    message: "Working API",
    time: new Date().getTime(),
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
