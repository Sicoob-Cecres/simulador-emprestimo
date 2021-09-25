import { ReactNode } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../Header";

interface layoutProps {
  children: ReactNode
}


export default function Layout({ children }:layoutProps) {
    return (
      <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1024} mx="auto" px="6">
          <SimpleGrid flex="1" gap="4" minChildWidth="640px" align="flex-start">
            <Box p={["6", "8"]} borderRadius={8}>
              {children}
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    );
}
