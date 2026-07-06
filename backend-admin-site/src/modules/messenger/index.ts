import { Router } from "express";

import chatListRoutes from "./infrastructure/routes/chat-list.routes";
import chatRoutes from "./infrastructure/routes/chat.routes";
import messageRoutes from "./infrastructure/routes/message.routes";
import messageUploadRoutes from "./infrastructure/routes/message-upload.routes";
import messageReadRoutes from "./infrastructure/routes/message.read.routes";
import mediaRoutes from "./infrastructure/routes/media.routes";
import reactionRoutes from "./infrastructure/routes/reaction.routes";
import readRoutes from "./infrastructure/routes/read.routes";
import userDirectoryRoutes from "./infrastructure/routes/user-directory.routes";
import publicDirectoryRoutes from "./infrastructure/routes/public-directory.routes";

import channelRoutes from "./channel/infrastructure/routes/channel.routes";

import groupRoutes from "./group/infrastructure/routes/group.routes";
import inviteRoutes from "./group/infrastructure/routes/invite.routes";

import chatSettingsRoutes from "./chat-management/infrastructure/routes/chat-settings.routes";
import folderRoutes from "./chat-folders/infrastructure/routes/folder.routes";

import storyRoutes from "./stories/infrastructure/routes/story.routes";

import miniAppRoutes from "./ecosystem/miniapps/infrastructure/routes/miniapp.routes";
import botRoutes from "./ecosystem/bots/infrastructure/routes/bot.routes";
import launcherRoutes from "./ecosystem/launcher/infrastructure/routes/launcher.routes";
import miniAppWalletRoutes from "./ecosystem/miniapps/infrastructure/routes/miniapp-wallet.routes";

const router = Router();

router.use("/", chatListRoutes);
router.use("/", chatRoutes);
router.use("/", messageRoutes);
router.use("/", messageUploadRoutes);
router.use("/", messageReadRoutes);
router.use("/", mediaRoutes);
router.use("/", reactionRoutes);
router.use("/", readRoutes);
router.use("/", userDirectoryRoutes);
router.use("/", publicDirectoryRoutes);

router.use("/", channelRoutes);

router.use("/", groupRoutes);
router.use("/", inviteRoutes);

router.use("/", chatSettingsRoutes);
router.use("/", folderRoutes);

router.use("/", storyRoutes);

router.use("/", miniAppRoutes);
router.use("/", botRoutes);
router.use("/", launcherRoutes);
router.use("/", miniAppWalletRoutes);

export * from "./messenger.kernel-module";

export default router;

