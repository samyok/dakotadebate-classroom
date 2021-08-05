import { MongoClient, ObjectID } from "mongodb";
const client = new MongoClient(process.env.DATABASE_URL, {useUnifiedTopology: true});
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
    }

    if (!client.isConnected())
        await client.connect();
    const db = client.db("brookingsdebate");
    const collection = db.collection("rfdDay4");
    collection.insertOne(req.body).then(() => {
        res.json({ success: true });
    })
}
