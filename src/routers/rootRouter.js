import express from "express"
import { getJoin, postJoin,getLogin,postLogin } from "../controllers/userController"
import { getUpload, home, postUpload } from "../controllers/videoController"

const rootRouter = express.Router()

rootRouter.get('/',home)
rootRouter.route('/join').get(getJoin).post(postJoin)
rootRouter.route('/upload').get(getUpload).post(postUpload)
rootRouter.route('/login').get(getLogin).post(postLogin)

export default rootRouter