import { getAccount } from "../../components/api/lib";
import * as Discord from "discord.js";
import { MongoClient, ObjectId } from "mongodb";
import { getSession } from "next-auth/client";

const bot = new Discord.Client();
const client = new MongoClient(process.env.DATABASE_URL, {useUnifiedTopology: true});

export default async function Hello(req, res) {

    let registrationCode = req.query.r;
    // console.log({ registrationCode});
    if (!registrationCode) return res.json({ success: false });

    if (!client.isConnected())
        await client.connect();
    const db = client.db('brookingsdebate');
    const registrations = db.collection('registration');
    let rslt = await registrations.findOne({ _id: ObjectId(registrationCode) });

    console.log('reg', rslt);


    // find custom data file
    const session = await getSession({ req });
    const customData = db.collection('ddiUsers');
    const query = { userId: session.user.userId };

    const update = {
        $set: {
            registration: rslt
        }
    }
    const options = { upsert: true };
    customData.updateOne(query, update, options);
    //

    const account = await getAccount({ req });


    await bot.login(process.env.DISCORD_BOT_TOKEN);

    let guild = await bot.guilds.fetch("858774360268734525");
    let role = await guild.roles.fetch("871052067832217650");
    console.log('a2g', { account });
    await guild.addMember(account.providerAccountId, {
        accessToken: account.accessToken,
        nick: rslt.studentFirstName + " " + rslt.studentLastName,
        roles: [role],
    });
    res.json({ success: true });
}
