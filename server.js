require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/db/db')



const PORT = 3000;

async function startServer() {

    try{

        await connectDB()
        console.log("connected to database")


        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`)
        })
    }catch(error){
        console.error("Failed to start server",error)
        process.exit(1)
    
}
    
}

startServer()

