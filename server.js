import express from "express"
import morgan from "morgan"
const app = express()

const PORT = 4000
app.set('views', process.cwd() +'/src/views')
app.set('view engine', 'pug')

const handleListen=()=>{
    console.log(`listening at http://localhost:${PORT}`)
}
app.use(morgan('dev'))
app.listen(PORT,handleListen)