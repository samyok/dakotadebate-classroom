import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { Button, chakra, Flex, HStack, Link, Select, Text, Textarea, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { MongoClient, ObjectID } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL, { useUnifiedTopology: true });


const Post = ({ vc, user, roomData }) => {
    const router = useRouter();
    const { id } = router.query;
    const [vote, setVote] = useState(null);
    const [session, loading] = useSession();
    const [rfd, setRfd] = useState("");
    const [round, setRound] = useState("default");
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/tournament/rooms").then(r => r.json()).then(d => {
            setData(d);
        });
    }, []);

    // create button list for selecting round number
    let buttonList = data
        // .filter(round => round.vc === vc)
        .map((round, i) => <option key={JSON.stringify(round)} value={i}>{round.title}</option>);
    let thisRound = data[round]?.rooms?.filter(a => a.vc === vc)[0];
    let teams = thisRound?.teams ?? null;
    let judge = thisRound?.judge ?? null;
    let teamNames = [
        teams ? teams[0].members.join(", ") : "-",
        teams ? teams[1].members.join(", ") : "-",
    ];
    let discords = [
        teams ? teams[0].discordIds : [],
        teams ? teams[1].discordIds : [],
        judge?.discordId ?? [],
    ];
    return (
        <chakra.div p={12}>
            <Head>
                <title>RFD</title>
                <meta name="description" content={"Give your Reason For Decision"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={{ minHeight: "calc(90vh - 50px)" }}>
                <VStack spacing={8}>
                    <Select defaultValue={"default"} value={round} onChange={e => setRound(e.currentTarget.value)}>
                        <option value="default" disabled>Select round</option>
                        {buttonList}
                    </Select>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Text>Your Decision:</Text>
                        <Button mx={2} colorScheme={"purple"} variant={vote === 0 ? "solid" : "outline"}
                                onClick={() => {
                                    setVote(0);
                                }}>{teamNames[0]}</Button>
                        <Button colorScheme={"purple"} variant={vote === 1 ? "solid" : "outline"} onClick={() => {
                            setVote(1);
                        }}>{teamNames[1]}</Button>
                    </Flex>
                    <Textarea onChange={e => setRfd(e.target.value)} placeholder="Reason for decision"
                              resize={"vertical"} />
                    <HStack>
                        <Text>Submitting as {user} (assigned judge: {judge?.name ?? "none"})</Text>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                let bdy = {
                                    vote: teamNames[vote],
                                    discords: discords.flat(),
                                    rfd,
                                    user,
                                    round,
                                    vc,
                                };
                                let keys = ["vote", "discords", "rfd", "user", "round", "vc"];
                                for (let i = 0; i < keys.length; i++) {
                                    let key = keys[i];
                                    if (!bdy[key]) return alert("missing " + key);
                                }
                                fetch("/api/rfd", {
                                    method: "post",
                                    body: JSON.stringify({
                                        vote: teamNames[vote],
                                        losers: teamNames[(1 + vote) % 2],
                                        discords: discords.flat(),
                                        rfd,
                                        user,
                                        round,
                                        vc,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }).then(() => {
                                    alert("Submitted!");
                                    location.href = "/";
                                });
                            }}>Submit {thisRound?.vc ?? ""}
                        </Button>
                    </HStack>
                </VStack>
            </main>
            <footer style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(0,0,0,0.4)",
            }}>
                Made by Samyok Nepal | <Link href="https://github.com/samyok/superfight" target={"_blank"}>Github</Link>
            </footer>
        </chakra.div>
    );

};

export default Post;

export async function getServerSideProps({ query }) {
    const { id } = query;
    console.log("id", id);

    if (!client.isConnected())
        await client.connect();

    let rfds = client.db("brookingsdebate").collection("rfds");
    let doc = JSON.parse(JSON.stringify(await rfds.findOne({ _id: ObjectID(id) })));
    console.log(doc);
    return {
        props: { ...doc },
    };
}
