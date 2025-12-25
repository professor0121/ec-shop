import http from 'http';
import app from "./src/app.js"

const server=http.createServer(app);
const PORT=process.env.PORT|| 3004

server.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})