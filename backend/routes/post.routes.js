
import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost,deletePost,commentOnPost,likeUnlikePost,getAllPosts,getLikedPosts,getFollowingPosts,getUserPosts,getMyLikedPosts,getMyPosts,getPost } from "../controllers/post.controller.js";

const router=express.Router();

router.get("/all",protectRoute,getAllPosts)

// router.get("/likes/:id",protectRoute,getLikedPosts)

router.get("/liked/me",protectRoute,getMyLikedPosts)
router.get("/:id",protectRoute,getPost)
router.get("/me",protectRoute,getMyPosts)
router.post("/create",protectRoute,createPost)
router.get("/following/:id",protectRoute,getFollowingPosts)
router.post("/like/:id",protectRoute,likeUnlikePost)

router.post("/comment/:id",protectRoute,commentOnPost)
router.delete("/:id",protectRoute,deletePost)
router.get("/likes/:username",protectRoute,getLikedPosts)
router.get("/user/:username",protectRoute,getUserPosts)

export default router;