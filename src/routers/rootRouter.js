import express from "express"
import { get } from "mongoose"
import { getJoin, postJoin,getLogin,postLogin,logOut,startGitHub,finishGitHub} from "../controllers/userController"
import { getSearch, home, postSearch } from "../controllers/videoController"
import { protectorMiddleware } from "../middleWare"

const rootRouter = express.Router()

rootRouter.get('/',home)
rootRouter.route('/join').get(getJoin).post(postJoin)
rootRouter.route('/login').get(getLogin).post(postLogin)
rootRouter.get('/github/start',startGitHub)
rootRouter.get('/github/finish',finishGitHub)
rootRouter.get('/logout',protectorMiddleware,logOut)
rootRouter.get('/result',getSearch)
export default rootRouter