// import express from "express"
// import { login, logout, signup,getMe } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/protectRoute.js";

// const router =express.Router();

// router.get("/me",protectRoute,getMe);
// router.post("/signup",signup);

// router.post("/login",login);

// router.post("/logout",logout);

// export default router; 



















import express from 'express';
import { signup, login, logout, getMe, verifyEmail } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me',protectRoute, getMe);
router.get('/verify-email/:token', verifyEmail);  

export default router;
