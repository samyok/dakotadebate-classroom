import React, { useEffect, useState } from "react";
import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { BsFillVolumeUpFill } from "react-icons/bs";


function Room({ room }) {

    const judgeTextColor = useColorModeValue("gray.500", "gray.200");
    const judgeColor = useColorModeValue("gray.200", "gray.700");

    const bkgColor = useColorModeValue("#A690FF", "#72E0F8");
    const vcColor = useColorModeValue("#7046EA", "#53A5B7");
    const vcTextColor = useColorModeValue("#A690FF", "white");

    return <VStack w={"400px"} backgroundColor={bkgColor}>
        <HStack width={"100%"} justifyContent={"center"} p={1} fontWeight={"bold"} backgroundColor={vcColor}
                color={"white"}>
            <BsFillVolumeUpFill size={20} />
            <Box>
                {room.vc}
            </Box>
        </HStack>
        {room.teams.map((team, index) =>
            <HStack key={"team" + index} width={"100%"} p={[4, 6]} justifyContent={"space-between"}>
                <HStack fontWeight={"bold"} fontSize={"24px"}>
                    {team.side ? <Box>{team.side}</Box> : <></>}
                    <Box>
                        {team.id}
                    </Box>
                </HStack>
                <VStack>
                    {team.members.map((member, index) => <Box key={"member" + index}>{member}</Box>)}
                </VStack>
            </HStack>)
        }
        <Box width={"100%"} p={2} fontWeight={"bolder"} textAlign={"center"} color={judgeTextColor}
             backgroundColor={judgeColor}>
            Judged by {room.judge.name}
        </Box>
    </VStack>;
}

export default function Tournament() {
    const [filter, setFilter] = useState("");

    const [rounds, setRounds] = useState([]);
    useEffect(() => {
        fetch("/api/tournament/rooms").then(r => r.json()).then(r => setRounds(r));
    }, []);

    return <VStack spacing={20}>

        {
            rounds.map((round, index) =>
                <VStack key={"round" + index} spacing={8}>
                    <Box fontSize={"40px"} fontWeight={"bold"}>
                        {round.title}
                    </Box>
                    {round.rooms.map((room) => <Room key={room.vc} room={room} />)}
                </VStack>,
            )
        }

    </VStack>;
}
