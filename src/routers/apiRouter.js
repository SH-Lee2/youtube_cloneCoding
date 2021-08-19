import express from "express"
import { comments, subscription, thumbs, view} from "../controllers/videoController"

const apiRouter = express.Router()

apiRouter.post("/videos/:id([0-9a-f]{24})/thumbs",thumbs)
apiRouter.post("/videos/:id([0-9a-f]{24})/view",view)
apiRouter.post("/videos/:id([0-9a-f]{24})/subscription",subscription)
apiRouter.post("/videos/:id([0-9a-f]{24})/comments",comments)
export default apiRouter