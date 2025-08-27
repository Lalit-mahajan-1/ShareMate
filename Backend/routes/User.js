import express from "express";
const route = express.Router();
import { create, googleLogin, login, logout } from "../controller/User.js";

route.post("/signup", create);
route.post("/login",login)
route.post("/google-login",googleLogin)
route.get("/logout",logout)
export default route;
