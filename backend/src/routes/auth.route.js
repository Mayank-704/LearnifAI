import express from "express"

const router = express.Router()

import {login,logout} from "../controllers/auth.controller.js"

import { verifyGoogleIdToken } from "../middlewares/verifyGoogleIdToken.js"

router.post("/login", verifyGoogleIdToken, login);
router.post("/logout", logout)

export default router;