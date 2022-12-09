import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  Heading,
  Box,
  Center,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";

type Routes = {
  text: string;
  route: string;
};

const Home: NextPage = () => {
  const routesArr: Routes[] = [
    { text: "See Counter example component", route: "counter-example" },
    { text: "See Fetch example component", route: "fetch-example" },
  ];

  return (
    <div>
      <Head>
        <title>NextJS 12 and Chakra UI starter kit</title>
        <meta
          name="description"
          content="This is a starter kit for NextJS 12 and Chakra UI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Center>
          <Heading
            role="heading"
            as="h1"
            color="white"
            borderRadius={4}
            mt={8}
            p={4}
            bg="#2464ec"
          >
            NextJS 12 and Chakra UI Starter Kit
          </Heading>
        </Center>
        <Center>
          <UnorderedList mt={8} listStyleType="none">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {routesArr.map(({ route, text }) => (
                <ListItem
                  key={route}
                  fontSize="2xl"
                  textDecoration="underline"
                  color="#376fec"
                >
                  <Link href={route}>{text}</Link>
                </ListItem>
              ))}
            </Flex>
          </UnorderedList>
        </Center>
      </Box>
    </div>
  );
};

export default Home;
