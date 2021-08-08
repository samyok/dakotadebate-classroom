import React, { useState } from "react";
import { Box, HStack, Tag, useColorModeValue, VStack } from "@chakra-ui/react";

const rounds = [
    {
        title: 'Round one',
        seeds: [
            {
                id: 1,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team B' }],
            },
            {
                id: 2,
                date: new Date().toDateString(),
                teams: [{ name: 'Team C' }, { name: 'Team D' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
        ],
    },
    {
        title: 'Round two3',
        seeds: [
            {
                id: 3,
                date: new Date().toDateString(),
                teams: [{ name: 'Team A' }, { name: 'Team C' },{ name: 'Team A' }, { name: 'Team C' },{ name: 'Team A' }, { name: 'Team C' },],
            },
        ],
    },
];



export default function Tournament() {
    const [filter, setFilter] = useState("");
    return <VStack>
        <HStack spacing={2}>
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
        </HStack>
    </VStack>;
}
