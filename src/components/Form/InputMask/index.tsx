import { forwardRef, ForwardRefRenderFunction, useCallback } from "react";
import {
  Input as ChakraInput,
  InputProps as ChakraInputPropos,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import { cep, currency, celPhone, cpf, string } from "../../../utils/masks";

interface InputProps extends ChakraInputPropos {
  mask?: "cep" | "currency" | "celPhone" | "cpf" | "string",
  name?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { mask, name, ...rest },
  ref?
) => {

  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let valueMasked = '';
    if(mask === "string") valueMasked = string(e.currentTarget.value);
    if(mask === "currency") valueMasked = currency(e.currentTarget.value);
    if(mask === "cep") {
      e.currentTarget.maxLength = 9;
      valueMasked = cep(e.currentTarget.value);
    }
    if(mask === "celPhone") {
      e.currentTarget.maxLength = 11;
      valueMasked = celPhone(e.currentTarget.value);
    }
    if(mask === "cpf") {
      e.currentTarget.maxLength = 11;
      valueMasked = cpf(e.currentTarget.value);
    }

    e.currentTarget.value = valueMasked;
  }, []);
  
  return (
        <InputGroup>
          <InputLeftAddon children={name} width="28" height="12" fontSize="20px" color="verdeEscuro.900" hidden={typeof name === 'undefined'} />
          <ChakraInput
            bg="FFF"
            size="lg"
            width="80"
            maxWidth="80"
            rounded="0"
            border="2px"
            borderColor="blackAlpha.900"
            focusBorderColor="blackAlpha.900"
            placeholder="Informe o valor desejado"
            _placeholder={{ color: '#002932', fontWeight: '900', fontSize: "20px" }}
            color="#002932"
            ref={ref}
            onKeyUp={handleKeyUp}
            {...rest}
          />
        </InputGroup>
  );
};

export const Input = forwardRef(InputBase);
