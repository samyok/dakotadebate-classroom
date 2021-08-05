import Head from "next/head";
import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
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
import Navigation from "../components/navigation";
import { useSession } from "next-auth/client";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import * as advancedFormat from "dayjs/plugin/advancedFormat";
import { AddIcon, LinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export default function Home() {
    const [session, loading] = useSession();
    console.log(session);
    const data = [{ label: "Schedule", content: <Calendar /> }, {
        label: "Office Hours",
        content: "After you finalize your type of debate at the end of class on Monday, you can sign up for office hours here. Feel free to join a Discord call if you see a staff member available, too!",
    }, {
        label: "Past Classes",
        content: <Box
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
                    Monday, August 1
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
                    color={useColorModeValue("gray.700", "white")}
                    fontWeight="700"
                >
                    Introduction Day
                </Heading>
                <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}
                >
                    Everything from day 1 was in one big meeting.
                </chakra.p>
            </Box>

            <HStack>
                <Button leftIcon={<LinkIcon />} colorScheme="blue" variant="solid" onClick={() => {
                    window.open("https://youtu.be/verMLyj3OIY", "_blank");
                }}>
                    Recorded Zoom Video
                </Button>
                <Button leftIcon={<LinkIcon />} colorScheme="yellow" variant="solid" onClick={() => {
                    window.open("https://docs.google.com/presentation/d/1iBmmMU6RbrC5SAOA5RTEUvNGNzzlBXQG1mjPA7FECUo/edit#slide=id.ga25f85cae5_0_0", "_blank");
                }}>
                    Slides
                </Button>
            </HStack>
        </Box>,
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
            name: "DDI Day 4",
            start: "8/5/21 1:00 PM",
            end: "8/5/21 4:30 PM",
            link: "https://zoom.us/j/95361686824?pwd=WEhUSC9SNFJjUFZMS3hCWW9vcXhUZz09",
            type: "zoom",
            signup: false,
            tag: "LD + PF",
        },
        {
            name: "Break",
            start: "8/5/21 4:30 PM",
        },
        {
            name: "Extemp (for real this time)",
            start: "8/5/21 6:30 PM",
            type: "zoom",
            link: "https://zoom.us/j/96739711780?pwd=bjcwWFFIU0FjUThuUXpmNVgxbmhvQT09",
            signup: true,
            tag: "LD + PF",
        },
        {
            name: "Case Building / Office Hours",
            start: "8/5/21 7:30 PM",
            type: "Discord",
            signup: true,
            details: "Join the LD/PF Help Discord call if you want help making your case! We'll help you make your case for the tournament on Monday!",
            tag: "LD + PF",
        }
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
