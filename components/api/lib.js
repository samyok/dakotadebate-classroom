import {MongoClient, ObjectID} from 'mongodb';
import {getSession} from "next-auth/client"
const client = new MongoClient(process.env.DATABASE_URL,  { useUnifiedTopology: true } );

export async function getAccount({req}){
    const session = await getSession({req});
    if(!client.isConnected())
        await client.connect();
    const db = client.db('brookingsdebate');
    const collection = db.collection('accounts');
    return await collection.findOne({userId: ObjectID(session.user.userId)});
}
