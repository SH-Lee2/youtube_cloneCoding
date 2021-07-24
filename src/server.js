import express from "express"
import morgan from "morgan"
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import session from "express-session"
import { watchSession } from "./middleWare"
import "./db"
import "./model/user"
import "./model/video"
import MongoStore from "connect-mongo"
import "dotenv/config"
const app = express()

const PORT = 4000


app.set('views', process.cwd() +'/src/views')
app.set('view engine', 'pug')
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(morgan('dev'))
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized:false,
    store : MongoStore.create({
        mongoUrl : process.env.DB_URL
    })
}))


const handleListen=()=>{
    console.log(`listening at http://localhost:${PORT}`)
}
app.use(watchSession)
app.use('/uploads',express.static('uploads'))  // 브라우저가 볼수있게      
app.use('/static',express.static('assets'))
app.use('/',rootRouter)
app.use('/user',userRouter)
app.use('/video',videoRouter)
app.listen(PORT,handleListen)