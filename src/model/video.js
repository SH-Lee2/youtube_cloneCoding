import mongoose from "mongoose"
const {Schema}=mongoose

const videoSchema = new Schema({
    video : {type : String , required :true},
    title : {type : String , required :true},
    discription : String,
    owner : {type:Schema.Types.ObjectId, ref : 'User'},
    
    createAt : {type : Date, default : Date.now},
    meta : {
        view : {type : Number , default : 0},
        like : {type : Number , default : 0},
        unLike : {type : Number , default : 0}
    }
})

const Video = mongoose.model("Video",videoSchema)
export default Video