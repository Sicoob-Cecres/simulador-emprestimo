import { useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast"

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Button as ChakraButton, Text, Stack, Checkbox } from "@chakra-ui/react";

import { Input } from "../../components/Form/InputMask";
import { Button } from '../../components/Form/Button';

import { celPhone, cpf as cpfMask } from "../../utils/masks";
import { useRouter } from "next/dist/client/router";

type SimulacaoProps = {
  simulacao: {
    linhaCredito: {
      nmeLinha: string,
      taxaJuros: Object,
      prazoMaximo: number
    },
    totalParcelas: number,
    valorParcela: number,
    valorSolicitado: string,
    valorTotal: number,
    valorTaxaJuros: number,
    valorTotalJuros: number
  }
}

export function ConfirmaPagamento({simulacao}:SimulacaoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isInvalid, setIsInvalid ] = useState<boolean>(false);
  const [ aceiteSimulacao, setAceiteSimulacao ] = useState<boolean>(false);
  const [ aceiteContato, setAceiteContato ] = useState<boolean>(false);
  const [ nome, setNome ] = useState<string>();
  const [ cpf, setCpf ] = useState<string>();
  const [ celular, setCelular ] = useState<string>();
  const [ email, setEmail ] = useState<string>();

  const router = useRouter()

  const toast = useToast();

  function sendEmail(){

    if(!nome || !cpf || !celular || !email){
      toast({ title: "Preencha todos os campos para continuar", status: "error", position: "top", isClosable: true });
      setIsInvalid(true);
      return false;
    }

    setIsLoading(true);
    setIsInvalid(false);
    
    fetch('/api/registraSimulacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome, cpf, celular, email, simulacao})
    })
    
    .then( response => {      
      if(response.status !== 200){
        toast({ title: "Ocorreu um erro ao enviar sua simulação.", status: "error", position: "top", isClosable: true });  
        return false;
      }
      toast({ title: "Sua simulação foi recebida com sucesso, em breve nossa equipe entrará em contato.", status: "success", position: "top", isClosable: true });
      setTimeout(() => router.reload(), 2000)
    })
    .catch( error => {
      toast({ title: "Ocorreu um erro ao enviar sua simulação.", status: "error", position: "top", isClosable: true });
    })
    .finally( () => setIsLoading(false))
    
  }

  return (
    <>
      <Button size="sm" value="Confirmar Simulação" fontSize="20" boxShadow="none" rounded="10" onClick={onOpen} />
      <Modal size="xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="verdeEscuro.900">Confirme sua solicitação</ModalHeader>
          <ModalCloseButton color="verdeEscuro.900" />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Text color="black">
                Confirme os dados da sua simulação e informe os dados abaixo que em breve nossa equipe entrará em contato.  
              </Text>
              
              <Input mask="string" name="Nome" isInvalid={isInvalid && !nome} onChange={ e => setNome(e.target.value)} placeholder="informe seu nome" _placeholder={{ color: '#002932' }} />
              <Input mask="cpf" name="CPF" isInvalid={isInvalid && !cpf} onChange={ e => setCpf(cpfMask(e.target.value))} placeholder="somente números" _placeholder={{ color: '#002932' }} />
              <Input mask="celPhone" name="Celular" isInvalid={isInvalid && !celular} onChange={ b => setCelular(celPhone(b.target.value))} placeholder="somente números" _placeholder={{ color: '#002932' }} />
              <Input type="email" name="Email" mask="string" isInvalid={isInvalid && !email} onChange={ e => setEmail(e.target.value)} placeholder="informe seu email" _placeholder={{ color: '#002932' }} />

              { (simulacao) &&(
              <Text color="black">
                  <strong> Dados da simulação</strong><br />
                    - Linha de Crédito: {simulacao.linhaCredito.nmeLinha}<br />
                    - Valor Solicitado: {simulacao.valorSolicitado}<br />
                    - Total de Parcelas: {simulacao.totalParcelas}
              </Text>
              )}
            </Stack>
            <br /> 
            <Stack spacing={4} > 
              <Checkbox borderColor="black" isChecked={aceiteSimulacao} onChange={(e) => setAceiteSimulacao(!aceiteSimulacao)} color="black" colorScheme="green">Estou ciente que o crédito é sujeito à aprovação cadastral e demais condições do produto e que as condições podem variar de acordo com o perfil</Checkbox>
              <Checkbox borderColor="black" isChecked={aceiteContato} onChange={(e) => setAceiteContato(!aceiteContato)} color="black" colorScheme="green">Concordo em receber contato de um representante do Sicoob Cecres a respeito da minha simulação </Checkbox>
            </Stack>

          </ModalBody>

          <ModalFooter>
            <Button size="sm" isLoading={isLoading}  loadingText="Enviando" value="Confirmar Simulação" fontSize="20" boxShadow="none" rounded="10" onClick={()=>sendEmail()} mr="3" isDisabled={!aceiteSimulacao || !aceiteContato} />
            <ChakraButton size="sm" fontSize="20" boxShadow="none" rounded="10" onClick={onClose} colorScheme="red">Voltar </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}