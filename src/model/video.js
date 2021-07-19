import mongoose from "mongoose"
const {Schema}=mongoose



const videoSchema = new Schema({
    video : {type : String , required :true},
    title : {type : String , required :true},
    description : String,
    owner : {type:Schema.Types.ObjectId, ref : 'User'},
    hashtags : [{type:String}],
    createAt : {type : Date, default : Date.now},
    meta : {
        view : {type : Number , default : 0},
        like : {type : Number , default : 0},
        unLike : {type : Number , default : 0}
    }
})

videoSchema.static("formatHashTags",(hash)=>{
    return hash
    .split(",")
    .map((v)=>v.startsWith("#") ? v : `#${v}`)
})

const Video = mongoose.model("Video",videoSchema)
export default Video