import mongoose from "mongoose"

const {Schema}=mongoose

const commentSchema = new Schema({
    text: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
    createdAt: { type: Date, required: true, default: Date.now },
    meta : {
        like : {type : Number , default : 0},
        unLike : {type : Number , default : 0},

    }
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment