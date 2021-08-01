import { MongoClient, ObjectID } from "mongodb";
const client = new MongoClient(process.env.DATABASE_URL, {useUnifiedTopology: true});

export default async function getUserNameFromRegistration(req, res){
    let r = req.query.r;
    if(!r) return res.json({name: "unknown"});
    if (!client.isConnected())
        await client.connect();
    const db = client.db("brookingsdebate");
    const collection = db.collection("registration");
    console.log("getUserName", );
    let rslt = await collection.findOne({ _id: ObjectID(r) });
    return res.json({name: rslt.studentFirstName.trim() + " " + rslt.studentLastName.trim()})
}
