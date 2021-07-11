import express from "express"
import { getJoin, postJoin } from "../controllers/userController"
import { getUpload, home, postUpload } from "../controllers/videoController"

const rootRouter = express.Router()

rootRouter.get('/',home)
rootRouter.route('/join').get(getJoin).post(postJoin)
rootRouter.route('/upload').get(getUpload).post(postUpload)

export default rootRouter