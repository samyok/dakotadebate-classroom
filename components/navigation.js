import { Avatar, Box, Button, Flex, HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../public/images/widelogo.png";
import { signIn, signOut, useSession } from "next-auth/client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navigation() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [session, loading] = useSession();

    return <Flex px={[2, 4, 8]} justifyContent={"space-between"} alignItems={"center"}>
        <Box maxWidth={"400px"}>
            <Image src={logo} alt={"logo"} />
        </Box>
        {
            session && <HStack>
                <Text>Signed in
                    as {session?.customData?.registration?.studentFirstName?.trim() + " " + session?.customData?.registration?.studentLastName}</Text>
                <Button onClick={() => signOut()}>Logout</Button>)
                <IconButton onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                            aria-label={"dark mode toggle"} />
                <Avatar
                    size="md"
                    name={session.user.email}
                    src={session.user.image}
                />
            </HStack>
        }
        {
            (!loading && !session) && <HStack>
                <IconButton onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                            aria-label={"dark mode toggle"} />
                <Button onClick={() => signIn("discord")} colorScheme={"purple"} variant={"solid"}>Login with
                    Discord</Button>)

            </HStack>
        }
    </Flex>;
}
