import Head from "next/head";
import { Box, Button, chakra, Heading, HStack, Text } from "@chakra-ui/react";
import Navigation from "../components/navigation";
import { signIn, useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function Home() {
    const [session, loading] = useSession();

    const [regis, setRegis] = useState("");

    const [name, setName] = useState('');

    useEffect(() => {
        let query = new URLSearchParams(window.location.search);
        setRegis(query.get("r"));
        fetch('/api/getUserNameFromRegistration?r=' + query.get('r'))
            .then(r => r.json())
            .then(r => setName(r.name));
    }, []);

    useEffect(() => {
        if (session && regis) {
            if (!session.customData) {
                fetch("/api/addToGuild?r=" + regis)
                    .then(r => r.json())
                    .then((r) => {
                        location.href = "/";
                    });
            } else {
                location.href = "/";
            }
        } else if(regis) {
            window.localStorage.setItem("registration", regis);
        }
        if(session?.customData?.registration){
            location.href = "/";
        }
    }, [session, regis]);
    return (
        <div>
            <Head>
                <title>DDI Classroom</title>
                <meta name="description" content="The class dashboard for DDI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Navigation />
                <Box p={[2, 4, 8]}>
                    {(loading || session) && <Text>Loading...This may take a couple seconds. We&apos;re connecting to Discord to automatically add you to the server.</Text>}
                    {(!loading && !session) &&
                    <>
                        <Heading size={"2xl"} mb={3}>Welcome, {name}!</Heading>
                        <chakra.p my={2}>Class starts on August 2nd, and you need to make your Discord account!
                        </chakra.p>
                        <chakra.p my={2}>Never used Discord before? You will need to make an account and come back. Click the "Discord tutorial" button to view a tutorial.</chakra.p>
                        <chakra.p my={2}>You&apos;ll automatically be joined into the Discord, no invite links required.
                        </chakra.p>
                        <chakra.p my={2}>If you&apos;re not {name}, please check your email for your own unique link.</chakra.p>
                        <HStack mt={4}><Button
                            onClick={() => signIn("discord")}
                            colorScheme={"purple"} variant={"solid"}>Connect Discord Account to DDI</Button> <Button
                            onClick={() => window.open("https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord", "_blank")}
                            colorScheme={"purple"} variant={"outline"}>Discord Tutorial</Button></HStack>
                    </>
                    }
                </Box>
            </main>
        </div>
    );
}
