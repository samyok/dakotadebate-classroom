import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import * as advancedFormat from "dayjs/plugin/advancedFormat";
import { AddIcon, LinkIcon } from "@chakra-ui/icons";
import Navigation from "../components/navigation";
import Head from "next/head";
import { useState } from "react";
import Tournament from "../components/tournament";
import RFDs from "../components/RFDs";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export default function Home() {
    const [session, loading] = useSession();
    console.log(session);

    let whiteColor = useColorModeValue("white", "gray.800");
    let grayColor = useColorModeValue("gray.600", "gray.400");
    let blackColor = useColorModeValue("gray.700", "white");
    let detailColor = useColorModeValue("gray.600", "gray.300");
    const data = [{ label: "Schedule", content: <Calendar /> }, {
        label: "Tournament",
        content: <Tournament />,
    }, {
        label: "Ballots",
        content: <RFDs />,
    }, {
        label: "Past Classes",
        content: <VStack spacing={8}>{[
            {
                title: "Day 1",
                time: "8/2/2021",
                tag: "LD + PF",
                details: "Everything from day 1 was in one big meeting.",
                links: [
                    {
                        color: "blue",
                        link: "https://youtu.be/verMLyj3OIY",
                        text: "Recorded Zoom",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/presentation/d/1iBmmMU6RbrC5SAOA5RTEUvNGNzzlBXQG1mjPA7FECUo/edit#slide=id.ga25f85cae5_0_0",
                        text: "Slides",
                    },
                ],
            },
            {
                title: "Day 2",
                time: "8/3/2021",
                tag: "LD + PF",
                links: [
                    {
                        color: "blue",
                        link: "#",
                        text: "Zoom video still processing",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/presentation/d/1Xuuab_gzfw8D86RXl5jBAd_CLSt4KiQA-odm4LaUVTg/edit#slide=id.ga25f85cae5_0_0",
                        text: "LD Slides",

                    },
                    {
                        color: "purple",
                        link: "https://docs.google.com/presentation/d/1jya33hxxZExm_4rQ7VNxIffqLxOZ5GecionCAQ6ke7U/edit?usp=sharing",
                        text: "PF Slides",
                    },
                ],
            },
            {
                title: "Day 3",
                time: "8/4/2021",
                tag: "LD + PF",
                links: [
                    {
                        color: "blue",
                        link: "#",
                        text: "Zoom video still processing",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/presentation/d/1dqccEgYBh-VU0rjCakBRGR9Owsy4dFQZuTNfp39D0W0/edit?usp=sharing",
                        text: "LD Slides",

                    },

                    {
                        color: "purple",
                        link: "https://docs.google.com/presentation/d/1v97XoyJ9vQZPKPe_NecXgI29QXC2yJvkbLkvVsrFj1A/edit?usp=sharingg",
                        text: "PF Slides",
                    },
                ],
            },

            {
                title: "Day 4",
                time: "8/5/2021",
                tag: "LD + PF",
                links: [
                    {
                        color: "blue",
                        link: "#",
                        text: "Zoom video still processing",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/presentation/d/1d6tCUYFxn5ZsQhqTovQ-oA3wQGsIylLxx2sgb3vs1Qw/edit?usp=sharing",
                        text: "LD Slides",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/document/d/1tRAGQGFfQmOAe5t7MgMXEQhNGfAaDUCw/edit?rtpof=true&sd=true",
                        text: "LD Example Aff",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/document/d/14XaCgoH1Iy7N8M3_LBnVUUueL5FRjIRK/edit?usp=sharing&ouid=114928060533144725949&rtpof=true&sd=true",
                        text: "LD Example Neg",
                    },
                    {
                        color: "purple",
                        link: "https://docs.google.com/presentation/d/1OstrBsSK-5jXu4GGAVDJiN7zc5EkquzCIJshrX1nKb0/edit?usp=sharing",
                        text: "PF Slides",
                    },
                ],
            },
            {
                title: "Day 5",
                time: "8/6/2021",
                tag: "LD + PF",
                links: [
                    {
                        color: "blue",
                        link: "#",
                        text: "Zoom video still processing",
                    },
                    {
                        color: "yellow",
                        link: "https://docs.google.com/presentation/d/1CbrhksvvkAC8kTueFyp_BP348liErK7cNfMliIJO1QE/edit?usp=sharing",
                        text: "LD Slides",

                    },
                    {
                        color: "purple",
                        link: "https://docs.google.com/presentation/d/1aDr9ikUrCPjikOTcsXinG6Oa08RxBC-zB8ATtACue-g/edit?usp=sharing",
                        text: "PF Slides",
                    },
                ],
            },
        ].map((pastClass, index) => <Box
            key={"class-" + index}
            mx="auto"
            px={8}
            w={"100%"}
            py={4}
            rounded="lg"
            shadow="lg"
            bg={whiteColor}
            maxW="2xl"
        >
            <Flex justifyContent="space-between" alignItems="center">
                <chakra.span
                    fontSize="sm"
                    color={grayColor}
                >
                    {dayjs(pastClass.time).format("dddd, MMMM Do")}
                </chakra.span>
                <Text
                    px={3}
                    py={1}
                    bg="gray.600"
                    color="gray.100"
                    fontSize="sm"
                    fontWeight="700"
                    rounded="md"
                >
                    General
                </Text>
            </Flex>

            <Box mt={2} mb={4}>
                <Heading
                    fontSize="2xl"
                    color={blackColor}
                    fontWeight="700"
                >
                    {pastClass.title}
                </Heading>
                <chakra.p mt={2} color={detailColor}>
                </chakra.p>
            </Box>

            <Stack>
                {pastClass.links.map((link, i) => <Button key={"btn" + i} leftIcon={<LinkIcon />}
                                                          colorScheme={link.color}
                                                          variant="solid"
                                                          onClick={() => {
                                                              window.open(link.link, "_blank");
                                                          }}>
                    {link.text}
                </Button>)}
            </Stack>
        </Box>)}</VStack>,
    }];
    let tabBorderLeft = useColorModeValue("1px solid rgba(112, 70, 234, 0.6)", "1px solid rgba(112, 70, 234, 0.2)");
    return (
        <div>
            <Head>
                <title>DDI Classroom</title>
                <meta name="description" content="The class dashboard for DDI" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <Navigation />
                {/*<Flex justifyContent={"center"}>*/}
                {/*    <Button variant={"solid"} flexGrow={1} colorScheme={"red"} m={5} onClick={() => {*/}
                {/*        window.open("https://forms.gle/LAW57Aza63npbuXL6", "_blank");*/}
                {/*    }}>DEBATE SELECTION FORM</Button>*/}
                {/*</Flex>*/}
                {session &&
                <Box p={[2, 4, 8]}>
                    <Tabs isManual orientation={"vertical"} variant={"soft-rounded"} colorScheme={"purple"}>
                        <TabList>
                            {data.map((tab, index) => (
                                <Tab key={index} textAlign={"left"} whiteSpace={"nowrap"}>{tab.label}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {data.map((tab, index) => (
                                <TabPanel ml={4} h={"100%"} key={index}
                                          borderLeft={tabBorderLeft}>
                                    {tab.content}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </Box>}
                {(!loading && !session?.customData?.registration) && <Box p={[2, 4, 8]}>
                    <Text>Login to view this content! If this is your first time logging in, please check your email for
                        a link to sign up.</Text></Box>}
            </main>
        </div>
    );
}

function Calendar() {
    const data = [
        {
            name: "DDI Tournament",
            start: "8/9/21 9:30 AM",
            end: "8/9/21 4:30 PM",
            type: "discord",
            signup: true,
            details: "Hit the signup button to check in :)",
            tag: "LD + PF",
        },
        // {
        //     name: "Break",
        //     start: "8/6/21 4:30 PM",
        // },
        // {
        //     name: "SD Rural Debate vs Debate at National Competitions (NSDA Nats or ToC Circuit)",
        //     details: "Led by Srishti Kumari and Catherine Liu",
        //     start: "8/6/21 6:30 PM",
        //     type: "zoom",
        //     link: "https://zoom.us/j/92829918790?pwd=cVZtTUp1MTRyNXhKalNhSVE0TXV0QT09",
        //     signup: true,
        //     tag: "LD + PF",
        // },
        // {
        //     name: "Managing Debate Anxiety",
        //     start: "8/5/21 7:30 PM",
        //     type: "zoom",
        //     signup: true,
        //     tag: "LD + PF",
        //     link: "https://zoom.us/j/92829918790?pwd=cVZtTUp1MTRyNXhKalNhSVE0TXV0QT09",
        // },
        // {
        //     name: "Make your cases!",
        //     start: "8/6/21 8:00 PM",
        //     details: "This isn't an event, just a reminder to make your cases before the debate tournament on Monday morning!",
        // },
    ];

    const [filter, setFilter] = useState("");

    return (
        <VStack spacing={8}>
            <HStack>
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
            {data
                .filter(a => !a.tag || a.tag.includes(filter))
                .map((cal, i) => <CalendarItem cal={cal} key={`cal-item-${i + 1}`} />)}
        </VStack>
    );
}

function CalendarItem({ cal }) {
    const [session, loading] = useSession();

    const signupProperty = (cal.name + " " + cal.start).replace(/[^A-Za-z0-9]/g, "_");

    const showButton = (!cal.signup) || (cal.signup && +session.customData[signupProperty]);
    return <Box
        mx="auto"
        px={8}
        w={"100%"}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
    >
        <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
            >
                {dayjs().to(cal.start)} • {dayjs(cal.start).format("dddd, MMMM Do h:mm A")} CST
            </chakra.span>
            <Text
                px={3}
                py={1}
                bg="gray.600"
                color="gray.100"
                fontSize="sm"
                fontWeight="700"
                rounded="md"
            >
                {cal.tag ?? "LD + PF"}
            </Text>
        </Flex>

        <Box mt={2} mb={4}>
            <Heading

                fontSize="2xl"
                color={useColorModeValue("gray.700", "white")}
                fontWeight="700"
            >
                {cal.name}
            </Heading>
            <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}
                      display={!!cal.details ? "block" : "none"}>
                {cal.details}
            </chakra.p>
        </Box>
        <HStack>
            {(showButton && cal.type === "zoom") &&
            <Button leftIcon={<LinkIcon />} colorScheme="blue" variant="solid" onClick={() => {
                if (cal.link) location.href = cal.link;
                else alert("Link not available yet! Come back when it's about to start.");
            }}>
                Zoom
            </Button>}
            {(showButton && cal.type === "discord") &&
            <Button leftIcon={<LinkIcon />} colorScheme="purple" variant="solid" onClick={() => {
                location.href = "https://discord.com/channels/858774360268734525/";
            }}>
                Discord
            </Button>}

            {
                (cal.signup && !+session.customData[signupProperty]) &&
                <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" onClick={() => {
                    fetch(`/api/setUserData?key=${signupProperty}&body=1`).then(() => location.reload());
                }}>
                    Signup
                </Button>
            }
            {
                +session.customData[signupProperty] &&
                <Button colorScheme="green" variant="solid" onClick={() => {
                    fetch(`/api/setUserData?key=${signupProperty}&body=0`).then(() => location.reload());
                }}>
                    Signed up
                </Button>
            }
        </HStack>
    </Box>;
}
