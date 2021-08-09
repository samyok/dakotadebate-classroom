import React, { useState } from "react";
import { Box, HStack, Tag, useColorModeValue, VStack } from "@chakra-ui/react";
import { BsFillVolumeUpFill } from "react-icons/bs";

const rounds = [
    {
        title: 'Round 1',
        rooms: [
            {
                vc: 'Voice Channel 1',
                judge: {
                    id: 'JUDGE1',
                    name: 'Carter Demaray',
                },
                teams: [
                    {
                        id: 'PF1',
                        members: ['Hajrah Iqbal', 'Savannah Kloster'],
                        side: 'AFF'
                    }, 
                    {
                        id: 'PF2',
                        members: ['Lily Christian', 'Sophie Munson'],
                        side: 'NEG',
                    }
                ],
            },
            {
                vc: 2,
                judge: {
                    id: 'JUDGE2',
                    name: 'Srishti Kumari',
                },
                teams: [
                    {
                        id: 'PF3',
                        members: ['Hashmita Nittala', 'Samanvi Tummala'],
                    }, 
                    {
                        id: 'PF4',
                        members: ['Emily Hua', 'Sampada Nepal'],
                    }
                ],
            },
        ],
    },
    {
        title: 'Round 2',
        rooms: [
            {
                vc: 1,
                judge: {
                    id: 'JUDGE2',
                    name: 'Shrishti Kumari',
                },
                teams: [
                    {
                        id: 'PF1',
                        members: ['Hajrah Iqbal', 'Savannah Kloster'],
                    }, 
                    {
                        id: 'PF10',
                        members: ['Alex Kidangathazhe', 'Samuel Caugherty'],
                    }
                ],
            },
            {
                vc: 2,
                judge: {
                    id: 'JUDGE7',
                    name: 'Katherine Escalante',
                },
                teams: [
                    {
                        id: 'PF9',
                        members: ['Nikhita Gaddipati', 'Pranavi Donepudi'],
                    }, 
                    {
                        id: 'PF4',
                        members: ['Emily Hua', 'Sampada Nepal'],
                    }
                ],
            },
            
        ],
    },
];

function Room({ room }) {
    const judgeTextColor = useColorModeValue('gray.500', 'gray.200');
    const judgeColor = useColorModeValue('gray.50', 'gray.700');

    const bkgColor = useColorModeValue('#A690FF', '#72E0F8');
    const vcColor = useColorModeValue('#7046EA', '#53A5B7');
    const vcTextColor = useColorModeValue('#A690FF', 'white');

    return <VStack w={'500px'} rounded={'lg'} shadow={'lg'} backgroundColor={bkgColor} >
        <HStack width={'100%'} rounded={'lg'} justifyContent={'center'} p={1} fontWeight={'bold'} backgroundColor={vcColor} color={'white'}>
            <BsFillVolumeUpFill size={20}/>
            <Box>
                { room.vc}
            </Box>
        </HStack>
        {room.teams.map((team) => 
        <HStack width={'100%'} p={[4, 6]} justifyContent={'space-between'}>
            <HStack fontWeight={'bold'} fontSize={'24px'}>
                {team.side ? <Box>{team.side}</Box> : <></>}
                <Box>
                    {team.id}
                </Box>
            </HStack>
            <VStack>
                {team.members.map((member) => <Box>{member}</Box>)}
            </VStack>
        </HStack>)
        }
        <Box width={'100%'} p={2} rounded={'lg'} fontWeight={'bolder'} textAlign={'center'} color={judgeTextColor} backgroundColor={judgeColor}>
            Judged by {room.judge.name}
        </Box>
    </VStack>;
}

export default function Tournament() {
    const [filter, setFilter] = useState("");

    return <VStack spacing={20}>
        {/* <HStack spacing={2}>
            <Tag onClick={() => setFilter(p => p === "LD" ? "" : "LD")}
                 bg={useColorModeValue(filter === "LD" ? "gray.300" : null, filter === "LD" ? "gray.600" : null)}
                 _hover={{
                     bg: useColorModeValue("gray.300", "gray.600"),
                     cursor: "pointer",
                 }}>LD</Tag>
            <Tag onClick={() => setFilter(p => p === "PF" ? "" : "PF")}
                 bg={useColorModeValue(filter === "PF" ? "gray.300" : null, filter === "PF" ? "gray.600" : null)}
                 _hover={{
                     bg: useColorModeValue("gray.300", "gray.600"),
                     cursor: "pointer",
                 }}>PF</Tag>
        </HStack>
        <HStack>
            <VStack>
                <Box>
                    Rounds will be here tomorrow :)
                </Box>
            </VStack>
        </HStack> */}
        {
            rounds.map((round) => 
            <VStack spacing={8}>
                <Box fontSize={'40px'} fontWeight={'bold'}>
                    {round.title}
                </Box>
                {round.rooms.map((room) => <Room key={room.vc} room={room}/>)}
            </VStack>
            )
        }
        
    </VStack>;
}
