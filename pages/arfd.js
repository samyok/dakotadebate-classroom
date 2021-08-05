import Head from "next/head";
import { Box, chakra, Heading, Link, Tag, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/listrfd").then(r => r.json()).then(r => setData(r));
    }, []);
    return (
        <chakra.div p={12}>
            <Head>
                <title>RFD</title>
                <meta name="description" content="Digitized by Samyok" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <VStack spacing={8} p={10}>
                    {
                        data.map((rfd, i) => {
                            return <VStack spacing={2} p={5} w={'100%'} key={"rfd" + i} shadow={"lg"} rounded={"lg"}>
                                <Heading>{rfd.user}</Heading>
                                <Tag bg={rfd.vote === "aff" ? "green" : "red"} color={'white'}>{rfd.vote}</Tag>
                                <Text>{rfd.rfd}</Text>
                            </VStack>;
                        })
                    }
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
