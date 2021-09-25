import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

const ButtonBase:ForwardRefRenderFunction<HTMLButtonElement, ChakraButtonProps> = ({value,...rest}, ref?) => {
  return (
      <ChakraButton
      bgColor="#CDCD00"
      color="#002932"
      size="lg"
      boxShadow="5px 5px 11px 5px #00313C"
      rounded="0"
      w="auto"
      fontSize="30"
      fontWeight="semibold"
      _hover={{ bgColor: "roxo.500", color: "#FFF" }}
      _active={{ bgColor: "roxo.500", color: "#FFF" }}
      {...rest}>
        {value}
      </ChakraButton>
  )
}

export const Button = forwardRef(ButtonBase);