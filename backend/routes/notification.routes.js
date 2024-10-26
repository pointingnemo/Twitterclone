import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getNotification,deleteNotifications,deleteNotification,readNotification } from "../controllers/notification.controller.js";

const router=express.Router();

router.get("/",protectRoute,getNotification);
router.delete("/",protectRoute,deleteNotifications);
router.delete("/:id",protectRoute,deleteNotification);
router.put("/:id",protectRoute,readNotification);


export default router;  