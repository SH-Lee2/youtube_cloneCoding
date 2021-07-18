import express from "express"
import { getUpload, postUpload } from "../controllers/videoController"
import { videoUpload } from "../middleWare"
const videoRouter = express.Router()

videoRouter.route('/upload').get(getUpload).post(videoUpload.single('videoFile'),postUpload)

export default videoRouter