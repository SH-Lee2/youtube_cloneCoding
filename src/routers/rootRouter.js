import express from "express"
import { getJoin, postJoin } from "../controllers/userController"
import { home } from "../controllers/videoController"

const rootRouter = express.Router()

rootRouter.get('/',home)
rootRouter.route('/join').get(getJoin).post(postJoin)

export default rootRouter