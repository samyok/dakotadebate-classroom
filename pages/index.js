import Head from "next/head";
import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Link,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import { useSession } from "next-auth/client";
import * as dayjs from "dayjs";
// import * as relativeTime from "dayjs/plugin/RelativeTime"; // import plugin
// import * as advancedFormat from "dayjs/plugin/advancedFormat";
import { AddIcon, LinkIcon } from "@chakra-ui/icons";

// dayjs.extend(relativeTime);
// dayjs.extend(advancedFormat);

export default function Home() {
    const [session, loading] = useSession();
    console.log(session);
    const data = [{ label: "Schedule", content: <Calendar /> }, {
        label: "Office Hours",
        content: "After you finalize your type of debate at the end of class on Monday, you can sign up for office hours here. Feel free to join a Discord call if you see a staff member available, too!",
    }, {
        label: "Past Classes",
        content: "Past classes will appear here as they become available.",
    }];
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
                {session?.customData?.registration &&
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
                                          borderLeft={"1px solid rgba(112, 70, 234, 0.6)"}>
                                    {tab.content}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </Box>}
                {(!loading && !session?.customData?.registration) && <Box p={[2, 4, 8]}>
                    <Text>Login to view this content! If this is your first time logging in, please check your email for a link to sign up.</Text></Box>}
            </main>
        </div>
    );
}

function Calendar() {
    const data = [
        {
            name: "Introduction to DDI and Debate",
            start: "8/2/21 1:00 PM",
            end: "8/2/21 2:00 PM",
            type: "zoom",
            signup: false,
        },
        {
            name: "Basics of Research",
            start: "8/2/21 2:00 PM",
            end: "8/2/21 3:00 PM",
            type: "zoom",
            signup: false,
        },
        {
            name: "Inclusivity talk",
            start: "8/2/21 3:00 PM",
            end: "8/2/21 4:00 PM",
            type: "zoom",
            signup: false,
        },
        {
            name: "Types of debate/topic summaries",
            start: "8/2/21 4:00 PM",
            end: "8/2/21 4:30 PM",
            type: "zoom",
            signup: false,
        },
        {
            name: "Discord Polls/Partner Match/Signup for evening activities",
            start: "8/2/21 4:30 PM",
            end: "8/2/21 5:00 PM",
            type: "discord",
            signup: false,
        },
        {
            name: "Break",
            start: "8/2/21 5:00 PM",
        },
        {
            name: "Games/Icebreakers",
            start: "8/2/21 6:30 PM",
            details: "We'll play games like mafia, Quizlet live, Minecraft bedwars, Skribbl, etc. Staff will be organizing various activities in the Discord. Click the signup button below so we know how many people to plan for :)",
            type: "discord",
            signup: true,
        },
    ];
    return (
        <VStack spacing={8}>
            {data.map((cal, i) => <CalendarItem cal={cal} key={`cal-item-${i + 1}`} />)}
        </VStack>
    );
}

function CalendarItem({ cal }) {
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
                {/*{dayjs().to(cal.start)} •*/}

                {dayjs(cal.start).format("dddd, MMMM D h:mm A")}
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
                {cal.name}
            </Heading>
            <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}
                      display={!!cal.details ? "block" : "none"}>
                {cal.details}
            </chakra.p>
        </Box>

        <HStack>
            {cal.type === "zoom" && <Button leftIcon={<LinkIcon />} colorScheme="blue" variant="solid" onClick={() => {
                if (cal.link) location.href = cal.link;
                else alert("Link not available yet! Come back when it's about to start.");
            }}>
                Zoom
            </Button>}
            {cal.type === "discord" &&
            <Button leftIcon={<LinkIcon />} colorScheme="purple" variant="solid" onClick={() => {
                location.href = "https://discord.com/channels/858774360268734525/";
            }}>
                Discord
            </Button>}
            {
                cal.signup &&
                <Button leftIcon={<AddIcon />} colorScheme="blue" variant="solid" disabled>
                    Signup opens Monday
                </Button>
            }
        </HStack>
    </Box>;
}
