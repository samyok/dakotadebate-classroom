import { Heading, HStack, Tag, Text, useColorMode, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function RFDs() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [session, loading] = useSession();
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        if (session.user) fetch("/api/tournament/listrfd").then(r => r.json()).then(d => {
            console.log(session.user);
            setData(d);
        });
    }, [session]);
    useEffect(() => {
        fetch("/api/tournament/rooms")
            .then(r => r.json())
            .then(r => setRooms(r));
    }, []);

    return <VStack spacing={8} p={10}>
        {
            data.filter(a => a.discords.includes(session.user.discordId) || session.user.discordId === '272115412353679363').map((rfd, i) => {
                return <VStack spacing={2} p={5} w={"100%"} key={"rfd" + i} shadow={"lg"} rounded={"lg"}>
                    <HStack>
                        <Tag bg={"green.800"} color={"white"}>Winners: {rfd.vote}</Tag>
                        <Tag bg={"purple.300"} color={"white"}>{rfd.losers}</Tag>
                    </HStack>
                    <Tag bg={"purple.300"} color={"white"}>{rooms[rfd.round]?.title} | {rfd.vc}</Tag>
                    <Text>{rfd.rfd}</Text>
                    <Heading size={'sm'}>{rfd.user}</Heading>
                </VStack>;
            })
        }
    </VStack>;
}
