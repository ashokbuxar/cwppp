import { MongoClient } from "../deps.ts";
import { config } from "../deps.ts";
const client = new MongoClient();
const env = config();

// database user name - pritipuja, 
// database password - buxarbihar 
// mongodb atlas account emailid = pritipuja1980@gmail.com, 
// mongodb atlas account password - buxarbihar

client.connectWithUri(env.MONGODB_URI);

const db = client.database("cwpp");
console.log("database connected successfully");
export default db;
