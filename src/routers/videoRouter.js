import express from "express"
import { deleteVideo, getEditVideo, getUpload, postEditVideo, postUpload, watch } from "../controllers/videoController"
import { videoUpload } from "../middleWare"
import Video from "../model/video"
const videoRouter = express.Router()

videoRouter.route('/upload').get(getUpload).post(videoUpload.single('videoFile'),postUpload)
videoRouter.get("/:id([0-9a-f]{24})",watch)
videoRouter.get("/:id([0-9a-f]{24})/delete-video",deleteVideo)
videoRouter.route("/:id([0-9a-f]{24})/edit-video").get(getEditVideo).post(postEditVideo)

export default videoRouter