import express from "express"
import { getChangePassword, getEditProfile, myProfile, postChangePassword, postEditProfile } from "../controllers/userController"
import { avatarUpload, protectorMiddleware } from "../middleWare"
const userRouter = express.Router()

userRouter.route("/:id([0-9a-f]{24})/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get('/:id([0-9a-f]{24})',protectorMiddleware,myProfile)
userRouter.route('/:id([0-9a-f]{24})/editProfile').all(protectorMiddleware).get(getEditProfile).post(avatarUpload.single('avatar'),postEditProfile)

export default userRouter