import mongoose from "mongoose";

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(`Error While Connecting to DB: ${error}`);
  } finally {
    console.log("Connected to mongo Successfully!");
  }
}
export default connectToMongoDB;
