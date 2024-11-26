import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectToDb from "../config/dbConfig.js";

const connection = await connectToDb(process.env.URL);

// Pegando todos os posts do DataBase
export async function getAllPosts() {
    const db = connection.db("imersao");
    const collectionDb = db.collection("posts");
    return collectionDb.find().toArray();
}

export async function createPost(newBody) {
    const db = connection.db("imersao");
    const collectionDb = db.collection("posts");
    return collectionDb.insertOne(newBody);
}

export async function attPutPost(id, newBody) {
    const db = connection.db("imersao");
    const collectionDb = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return collectionDb.updateOne({_id: new ObjectId(objId)}, {$set: newBody});
}