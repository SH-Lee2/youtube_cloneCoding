import express from "express"
import { deleteVideo, getEditVideo, getUpload, postEditVideo, postUpload, watch } from "../controllers/videoController"
import { protectorMiddleware, videoUpload } from "../middleWare"
import Video from "../model/video"
const videoRouter = express.Router()

videoRouter.route('/upload').all(protectorMiddleware).get(getUpload).post(videoUpload.single('videoFile'),postUpload)
videoRouter.get("/:id([0-9a-f]{24})",watch)
videoRouter.get("/:id([0-9a-f]{24})/delete-video",protectorMiddleware,deleteVideo)
videoRouter.route("/:id([0-9a-f]{24})/edit-video").all(protectorMiddleware).get(getEditVideo).post(postEditVideo)

export default videoRouter