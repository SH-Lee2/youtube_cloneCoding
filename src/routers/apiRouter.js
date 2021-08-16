import express from "express"
import { thumbs, view} from "../controllers/videoController"

const apiRouter = express.Router()

apiRouter.post("/videos/:id([0-9a-f]{24})/thumbs",thumbs)
apiRouter.post("/videos/:id([0-9a-f]{24})/view",view)
export default apiRouter