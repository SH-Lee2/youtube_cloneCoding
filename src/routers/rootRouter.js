import express from "express"
import { getJoin, postJoin,getLogin,postLogin,logOut,startGitHub,finishGitHub} from "../controllers/userController"
import { home } from "../controllers/videoController"

const rootRouter = express.Router()

rootRouter.get('/',home)
rootRouter.route('/join').get(getJoin).post(postJoin)
rootRouter.route('/login').get(getLogin).post(postLogin)
rootRouter.get('/github/start',startGitHub)
rootRouter.get('/github/finish',finishGitHub)

rootRouter.get('/logout',logOut)
export default rootRouter