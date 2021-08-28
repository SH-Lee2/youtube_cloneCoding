import mongoose from "mongoose"
import bcrypt from "bcrypt"
const {Schema}=mongoose

const userSchema = new Schema({
    name : {type : String , required : true},
    id : {type : String , unique : true},
    password : {type : String },
    location : String,
    video : [{
        type:Schema.Types.ObjectId, ref : 'Video'
    }],
    subscribeVideo : [{
        type:Schema.Types.ObjectId, ref : 'Video'
    }],
    meta : {
        subscribers : {type :Number, default : 0}
    },
    socialLogin: { type: Boolean, default: false },
    email : {type : String , required : true, unique : true},
    avatarUrl : String
})

//라운드 횟수 .env 생성

userSchema.pre("save",async function(next){
    if(!this.socialLogin){
        //user를 저장할때 마다 비밀번호가 바뀌는걸 방지
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,5)
        }
    }
    

    
    return next()
})

const User = mongoose.model("User",userSchema)
export default User