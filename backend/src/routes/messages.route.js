import express from "express";
import { getConversationsForSidebar, getUsersForSidebar } from "../controllers/messages.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages } from "../controllers/messages.controller.js";
import { sendMessage } from "../controllers/messages.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/users" , getUsersForSidebar);
router.get("/conversations" , getConversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media") , sendMessage);
// in the frontend , the key for the file should be "media".

export default router;