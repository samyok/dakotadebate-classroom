import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL, {useUnifiedTopology: true});

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            scope: "identify email guilds.join"
        })
    ],
    database: process.env.DATABASE_URL,
    callbacks: {
        session: async (session, user) => {
            if(!client.isConnected())
                await client.connect();
            const db = client.db('brookingsdebate');
            const collection = db.collection('accounts');
            let rslt = await collection.findOne({userId: user.id});
            console.log('sess', rslt.userId);
            let customData = await db.collection('ddiUsers').findOne({userId: rslt.userId.toString()});
            console.log('sess', customData);
            return {
                ...session,
                user: {
                    ...session.user,
                    discordId: rslt.providerAccountId,
                    userId: rslt.userId
                },
                customData
            };
        }
    }
})
