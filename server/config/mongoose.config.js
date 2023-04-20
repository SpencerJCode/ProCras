import mongoose from "mongoose";
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;
const uri = `mongodb+srv://${username}:${pw}@cluster0.cycjgio.mongodb.net/${dbName}?retryWrites=true&w=majority`;

async function dbConnect() {
  try {
    await mongoose.connect(uri);
    console.log("Established a connection to the database");
  } catch (error) {
    console.log("Something went wrong when connecting to the database", error)
  }
}

export default dbConnect;