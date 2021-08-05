import Head from "next/head";
import { Button, chakra, HStack, Link, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSession } from "next-auth/client";

export default function Home() {
    const [vote, setVote] = useState("");
    const [session, loading] = useSession();

    return (
        <chakra.div p={12}>
            <Head>
                <title>Superfight</title>
                <meta name="description" content="Digitized by Samyok" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <VStack spacing={8}>
                    <HStack>
                        <Text>Your Decision:</Text>
                        <Button colorScheme={"green"} variant={vote === "aff" ? "solid" : "outline"} onClick={() => {
                            setVote("aff");
                        }}>Affirmative</Button>
                        <Button colorScheme={"red"} variant={vote === "neg" ? "solid" : "outline"} onClick={() => {
                            setVote("neg");

                        }}>Negative</Button>
                    </HStack>
                    <Textarea placeholder="Reason for decision" resize={"vertical"} />
                    <HStack><Text>Submitting as {session?.user?.email ?? 'anonymous'}</Text> <Button variant={"outline"}>Submit</Button></HStack>
                </VStack>
            </main>
            <footer style={{
                position: "fixed",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(0,0,0,0.4)",
            }}>
                Made by Samyok Nepal | <Link href="https://github.com/samyok/superfight" target={"_blank"}>Github</Link>
            </footer>
        </chakra.div>
    );
}
