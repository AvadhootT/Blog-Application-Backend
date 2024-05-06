import express from "express";
import { getallUsers, login, signup } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getallUsers)

router.post("/signup", signup)

router.post("/login", login)

export default router;
