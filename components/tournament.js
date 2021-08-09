import React, { useEffect, useState } from "react";
import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { BsFillVolumeUpFill } from "react-icons/bs";

function Room({ room }) {
    const judgeTextColor = useColorModeValue('gray.700', 'gray.200');
    const judgeColor = useColorModeValue('gray.50', 'gray.700');

    const bkgColor = useColorModeValue('#DBD1FF', '#72E0F8');
    const vcColor = useColorModeValue('#B5A3FF', '#53A5B7');

    return <VStack w={"400px"} backgroundColor={bkgColor}>
        <HStack width={"100%"} justifyContent={"center"} p={1} fontWeight={"bold"} backgroundColor={vcColor}
                color={"white"}>
            <BsFillVolumeUpFill size={20} />
            <Box>
                {room.vc}
            </Box>
        </HStack>
        {room.teams.map((team, index) => 
        <HStack key={"team" + index} width={'100%'} p={[4, 6]} color={'gray.700'} justifyContent={'space-between'}>
            <HStack fontWeight={'bold'}>
                {team.side ? <Box fontSize={'20px'} m={2} color={'gray.50'} backgroundColor={vcColor} rounded={'lg'} p={1}> {team.side} </Box> : <></>}
                <Box fontSize={'24px'}>
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
