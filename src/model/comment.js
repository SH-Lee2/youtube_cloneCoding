import mongoose from "mongoose"
import { comments } from "../controllers/videoController"

const {Schema}=mongoose

const commentSchema = new Schema({
    text: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
    createdAt: { type: Date, required: true, default: Date.now },
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment