import express from "express"
import morgan from "morgan"
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import session from "express-session"
import { watchSession } from "./middleWare"
import "./db"
import "./model/user"
const app = express()

const PORT = 4000


app.set('views', process.cwd() +'/src/views')
app.set('view engine', 'pug')
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))

app.use(session({
    secret : "asdasdasdasdasdasdad",
    resave : true,
    saveUninitialized:true
}))


const handleListen=()=>{
    console.log(`listening at http://localhost:${PORT}`)
}
app.use(watchSession)
app.use('/',rootRouter)
app.use('/user',userRouter)
app.use('/video',videoRouter)
app.listen(PORT,handleListen)