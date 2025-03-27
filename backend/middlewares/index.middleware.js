import { checkJWT } from "../utils/jwt.js";

export const checkAuth = (req, res, next) => {
  if (req.cookies["bearer"] && checkJWT(req.cookies["bearer"])) next();
  else
    res.render("login", {
      title: "Login to your account",
      layout: "main",
      message: "Your current session has expired, please reauthenticate",
    });
};

export default checkAuth;
