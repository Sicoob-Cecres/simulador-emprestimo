import { Center, HStack, Img } from "@chakra-ui/react";

export function Logo() {
  return (
      <HStack alignSelf="center" mx="auto">
          <Img src="/assets/img/logo-cecres.png" h="16" />
      </HStack>
  );
}
