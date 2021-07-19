import express from "express"
import { deleteVideo, getUpload, postUpload, watch } from "../controllers/videoController"
import { videoUpload } from "../middleWare"
import Video from "../model/video"
const videoRouter = express.Router()

videoRouter.route('/upload').get(getUpload).post(videoUpload.single('videoFile'),postUpload)
videoRouter.get("/:id([0-9a-f]{24})",watch)
videoRouter.get("/:id([0-9a-f]{24})/delete-video",deleteVideo)

export default videoRouter