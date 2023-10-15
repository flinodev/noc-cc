import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    try {
      const { mongoUrl, dbName } = options;
      await mongoose.connect(mongoUrl, { dbName });
      console.log("Mongo connected");
    } catch (error) {
      console.log("Mongo connection error: ");
      throw error;
    }
  }
}
