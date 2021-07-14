import mongoose from "mongoose"
import bcrypt from "bcrypt"
const {Schema}=mongoose

const userSchema = new Schema({
    name : {type : String , required : true},
    id : {type : String , unique : true},
    password : {type : String },
    location : String,
    meta : {
        Subscribers : Number
    },
    socialLogin: { type: Boolean, default: false },
    email : {type : String , required : true, unique : true},
    avatarUrl : String
})

//라운드 횟수 .env 생성

userSchema.pre("save",async function(next){
    if(!this.socialLogin){
        const hash = await bcrypt.hash(this.password,5)
        this.password = hash
    }
    return next()
})

const User = mongoose.model("User",userSchema)
export default User