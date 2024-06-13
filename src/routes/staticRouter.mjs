import express from "express";
import {
  handleHomePage,
  handleSignupPage,
  handleSigninPage,
} from "../controllers/staticController.mjs";
import authService from "../services/auth.mjs";

const router = express.Router();

router.get("/",authService.authenticate, handleHomePage);
router.get("/signup", handleSignupPage);
router.get("/signin", handleSigninPage);

export default router;
