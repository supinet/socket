import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017");

let documentsCollection;

try {
    await client.connect();
    const db = client.db("document_socket");
    documentsCollection = db.collection("documents");
    console.log("Connect with database with success")
} catch (error) {
    console.log(error);
}

export { documentsCollection };