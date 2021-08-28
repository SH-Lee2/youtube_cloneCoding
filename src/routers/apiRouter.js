import express from "express"
import { Comments, getUserInfo, subscription, thumbs, view,deleteComment} from "../controllers/videoController"
import { protectorMiddleware } from "../middleWare"

const apiRouter = express.Router()

apiRouter.post("/videos/:id([0-9a-f]{24})/thumbs",protectorMiddleware,thumbs)
apiRouter.post("/videos/:id([0-9a-f]{24})/view",view)
apiRouter.post("/videos/:id([0-9a-f]{24})/subscription",subscription)
apiRouter.post("/videos/:id([0-9a-f]{24})/comments",Comments)
apiRouter.get("/videos/:id([0-9a-f]{24})/getuserinfo",getUserInfo)
apiRouter.post("/videos/:id([0-9a-f]{24})/deletecomments",deleteComment)
export default apiRouter