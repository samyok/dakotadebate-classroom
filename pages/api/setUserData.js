import {MongoClient} from 'mongodb';
import {getSession} from "next-auth/client"

const client = new MongoClient(process.env.DATABASE_URL);

export default async function setUserData(req, res) {
    const {key, body} = req.query;

    const session = await getSession({req});
    if (!key || !body || !session) return res.json({success: false});

    await client.connect();
    const db = client.db('brookingsdebate');
    const collection = db.collection('ddiUsers');
    const query = {userId: session.user.userId};
    let set = {};
    set[key] = body;
    const update = {$set: set}
    const options = {upsert: true};
    collection.updateOne(query, update, options);
    res.json({success: true});
}
