import type { NextPage } from "next";
import Link from "next/link";
import { Greeting } from "../components/greeting/Greeting";
import { Heading, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const FetchExample: NextPage = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchGreeting = async () => {
    const res = await fetch(
      "https://api.starter.dev/.netlify/functions/server/hello?greeting=from This Dot Labs!"
    );

    if (!res.ok) {
      setIsLoading(false);
      setGreeting("There was an error loading your greeting");
      return await Promise.reject(res.statusText);
    }
    setIsLoading(false);
    setGreeting(await res.text());
  };

  useEffect(() => {
    fetchGreeting();
  }, []);

  return (
    <div>
      <Center>
        <Heading
          role="heading"
          as="h1"
          pb={4}
          borderBottom="4px solid #2464ec"
          mt={8}
        >
          NextJS fetching data example from a REST API
        </Heading>
      </Center>

      <Greeting msg={isLoading ? "Loading..." : greeting} />
      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </div>
  );
};

export default FetchExample;
