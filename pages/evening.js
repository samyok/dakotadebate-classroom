import Head from "next/head";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Navigation from "../components/navigation";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import * as advancedFormat from "dayjs/plugin/advancedFormat";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL, { useUnifiedTopology: true });

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export default function Home({ people }) {
    // get a list of tags
    let tags = new Set();
    people.forEach(person => {
        let keys = Object.keys(person);
        keys.forEach(key => tags.add(key));
    });
    tags.delete("_id");
    tags.delete("userId");
    tags.delete("registration");
    tags = [...tags];
    return (
        <div>
            <Head>
                <title>DDI Events</title>
                <meta name="description" content="The events dashboard for DDI" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <Navigation />
                <Box p={[2, 4, 8]}>
                    <VStack>
                        {tags.map(tag => (
                            <Box key={JSON.stringify(tag)} rounded="lg" shadow="lg" p={8}>
                                <Heading>{tag.replace(/_/g, " ")}</Heading>
                                <Heading>({people.filter(p => !!p[tag]).length})</Heading>
                                {people.filter(p => !!+p[tag]).map(a => <Text
                                    key={JSON.stringify(a)}>{a.registration.studentFirstName + " " + a.registration.studentLastName}</Text>)}
                            </Box>
                        ))}
                    </VStack>
                </Box>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {

    if (!client.isConnected())
        await client.connect();
    const db = client.db("brookingsdebate");
    const collection = db.collection("ddiUsers");
    let rslt = await collection.find({});
    rslt = await rslt.toArray();
    rslt = JSON.parse(JSON.stringify(rslt));
    return {
        props: {
            people: rslt,
        },
    };
}
