import { Center, Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1024}
      h="16"
      mx="auto"
    >
      <Logo />
    </Flex>
  );
}
