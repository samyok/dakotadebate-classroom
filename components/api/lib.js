import { MongoClient, ObjectID } from "mongodb";
import { getSession } from "next-auth/client";

const client = new MongoClient(process.env.DATABASE_URL, { useUnifiedTopology: true });

export async function getAccount({ req, refresh }) {
    const session = await getSession({ req });
    console.log("acc", session);
    if (!client.isConnected())
        await client.connect();
    const db = client.db("brookingsdebate");
    const collection = db.collection("accounts");
    console.log("acc", session.user.userId);
    let rslt = await collection.findOne({ userId: ObjectID(session.user.userId) });

    // if it expires in the next minute, refresh.
    if (refresh || !rslt.accessTokenExpires || rslt.accessTokenExpires < Date.now() + 60) {
        let refreshedToken = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            body: new URLSearchParams({
                "client_id": process.env.DISCORD_CLIENT_ID,
                "client_secret": process.env.DISCORD_CLIENT_SECRET,
                "grant_type": "refresh_token",
                "refresh_token": rslt.refreshToken,
            }),
        }).then(r => r.json());
        await collection.updateOne({ userId: ObjectID(session.user.userId) }, {
            $set: {
                accessToken: refreshedToken.access_token,
                refreshToken: refreshedToken.refresh_token,
                accessTokenExpires: Date.now() + (+refreshedToken.expires_in)
            },
        });
        return {
            ...rslt,
            accessToken: refreshedToken.access_token,
            refreshToken: refreshedToken.refresh_token,
            accessTokenExpires: Date.now() + (+refreshedToken.expires_in)
        }
    } else {
        return rslt;
    }
}
