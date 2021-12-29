import { useCallback, useContext, useEffect } from "react";
import type { NextPage } from 'next'
import { Box, VStack, HStack, Grid, Heading, Table, Thead, Tr, Th, Tbody, Td,Text }  from "@chakra-ui/react";

import { Button } from '../components/Form/Button';
import { Input } from "../components/Form/InputMask";
import { ConfirmaPagamento } from "../components/ConfirmaPagamento";

import { SimuladorContext } from "../contexts/SimuladorContext";


const Home: NextPage = () => {
  const { isLoading, linhaCredito, valor, simulacao, executaSimulacao, gravaValor, selectLinhaCredito } = useContext(SimuladorContext);

  const handleSetLinhaCredito = async (id:number) => {
    await selectLinhaCredito(id);
  }
  const handleChange = useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
    await gravaValor(e.currentTarget.value)
  }, [valor]);

  useEffect( () => {
    if(linhaCredito !== 0 && valor !== '') executaSimulacao();
  },[linhaCredito, valor])

  return (
    <Grid>
      <Box mx="auto" h="100">
        <Heading>SIMULADOR DE EMPRÉSTIMO</Heading>
      </Box>
      <Box>
        <VStack spacing="10px">
          <HStack spacing="30px">
            <div className="sicoob-icon-color-61 icon 12" />       
            <Button value="Consignado" isActive={linhaCredito === 4722} onClick={() => handleSetLinhaCredito(4722)}/>
          </HStack>
          <HStack spacing="30px">
            <div className="sicoob-icon-color-14 icon 12" />
            <Button value="Crédito Pessoal" isActive={linhaCredito === 4732} onClick={() => handleSetLinhaCredito(4732)}/>
          </HStack>
          <HStack spacing="30px">
            <div className="sicoob-icon-color-19 icon 12" />       
            <Button value="Empréstimo com garantia de imóvel" isActive={linhaCredito === 1234} onClick={() => handleSetLinhaCredito(1234)}/>
          </HStack>
          <HStack spacing="30px">
            <div className="sicoob-icon-color-49 icon 12" />
            <Button value="Financiamento de veículos" isActive={linhaCredito === 5678} onClick={() => handleSetLinhaCredito(5678)}/>
          </HStack>
        </VStack>
      </Box>
      <Box mx="auto" mt="50">
        <HStack spacing="15px">
          <Input mask="currency" onChange={handleChange} value={valor}/>
          <Button value="Simular" isLoading={isLoading} onClick={() => executaSimulacao()}/> 
        </HStack>
      </Box>
      { (simulacao && simulacao.length > 0) &&(
            <Box mx="auto" mt="50" bg="white" borderRadius="15" p="5">
              <Table color="black" fontSize="20">
                <Thead>
                  <Tr>
                    <Th>Prazo</Th>
                    <Th>Parcela</Th>
                    <Th>&nbsp;</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    simulacao?.map((s, k) => {
                      return (
                        <Tr key={k}>
                          <Td>{s.totalParcelas}X</Td>
                          <Td>{s.valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'})}<sup>*</sup></Td>
                          <Td><ConfirmaPagamento simulacao={s} /></Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
              <Box>
                <Text color="black">
                *Crédito sujeito à aprovação cadastral e demais condições do produto.<br />
                As condições podem variar de acordo com o perfil.
                </Text>
              </Box>
            </Box>
          )
        }

    </Grid>
  )
}

export default Home
