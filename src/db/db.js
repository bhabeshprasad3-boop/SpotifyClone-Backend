const mongoose = require('mongoose')

async function connectDB() {

    try{
       await mongoose.connect(process.env.MONGO_DB)
    }catch(err){
        console.error("Failed to connect with database",err)
        process.exit(1)
    }
    
}

module.exports = connectDB;