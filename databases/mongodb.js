import "dotenv/config"
import {mongoose} from "mongoose"

const database = process.env.DATABASE

mongoose.connect(process.env.URI,{dbName:database})
.then(()=>console.log(`Connected to database: "${database}" and collection "${process.env.NOTES_COLLECTION}"`))
.catch((error)=>
    console.log(`Couldn't connect to ${database}`,error))


