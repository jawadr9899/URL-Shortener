import { Router } from "express";
import {
  handleURL,
  handleURLOpen,
  handleClearURLs,
  handleSignup,
  handleSignin,
} from "../controllers/index.mjs";
import authService from "../services/auth.mjs";

const router = Router();

router.post("/", authService.authenticate, handleURL);
router.delete("/", authService.authenticate, handleClearURLs);

router.get("/:id", handleURLOpen);
router.post("/signup", handleSignup);
router.post("/signin", handleSignin);
// temp
router.get("/asdfasd", (req, res) => {});

export default router;
