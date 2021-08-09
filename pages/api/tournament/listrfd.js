import { MongoClient, ObjectID } from "mongodb";
const client = new MongoClient(process.env.DATABASE_URL, {useUnifiedTopology: true});
export default async function handler(req, res) {

    if (!client.isConnected())
        await client.connect();
    const db = client.db("brookingsdebate");
    const collection = db.collection("rfd_tourney");
    const cursor = await collection.find({});
    let data = JSON.stringify(await cursor.toArray());
    res.json(JSON.parse(data))
}
