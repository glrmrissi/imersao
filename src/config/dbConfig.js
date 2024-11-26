import { MongoClient } from 'mongodb';

export default async function connectToDb(URL) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(URL);
        console.log('\x1b[33m Connecting to the database cluster...\x1b[0m');
        await mongoClient.connect();
        console.log('  - Connected to \x1b[32mMongoDB Atlas \x1b[0msuccessfully!');
        console.log('------------------------------------------------')
        return mongoClient;
    } catch (erro) {
        console.error('\x1b[31m Failed to connect to the DataBase!\x1b[0m', erro);
        process.exit();
    }
}