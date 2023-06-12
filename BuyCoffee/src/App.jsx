import {
  Container,
  Box,
  Flex,
  Text,
  Image,
  Center,
  SimpleGrid,
  Card, CardBody,
  Heading,
  Input,
  Skeleton,
  Textarea,
  Stack,
  Tooltip,
  NumberInput,
  NumberInputField, 
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button
} from '@chakra-ui/react'
import dayjs from "dayjs";
import CarLogo from './sport-car.png'
import { ConnectWallet, Web3Button, useContract, useContractRead } from '@thirdweb-dev/react';
import { RENTACAR_ADDRESS } from './const/contractAddress';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { CrossStorageClient } from 'cross-storage'
import { useSearchParams } from 'react-router-dom';

// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
export default function Home() {
  const [searchParams] = useSearchParams();
  // const queryString = window.location.search;
  // console.log(queryString)
  // const urlParams = new URLSearchParams(queryString);
  const { contract } = useContract(RENTACAR_ADDRESS)
  const [name, setName] = useState(searchParams.get('name'))
  const [name2, setName2] = useState(searchParams.get('username'))
  const [message, setMessage] = useState('')
  const [message2, setMessage2] = useState(searchParams.get('price'))
  // const [time, setTime] = useState(10)
  // useEffect(()=>{
  //   console.log('contract',contract)
  // },[contract])
  const {
    data: totalCar,
    isLoading: loadingTotalCar
  } = useContractRead(contract, 'getTotalCar')
  const {
    data: recentCar,
    isLoading: loadingRecentCar
  } = useContractRead(contract, 'getAllCar')

  // const source = 'http://localhost:3000/dashboard';
  // const sourceTarget = `${source}/`;
  // console.log('sourceTarget', sourceTarget);
  // const storage = new CrossStorageClient(sourceTarget);

  useEffect(()=>{
    
    console.log(searchParams); // ▶ URLSearchParams {}
  } ,[])

  return (
    <Box bg='#FEFEFE' w={'100%'} h={'100%'} >
      <Container maxW={'1200px'} w={'100%'}>
        {/**/}
        <Flex
          px='10px'
          bg={'#fff'}
          h={'120px'}
          borderRadius={'20px'}
          boxShadow={'lg'}
        >
          <Center w='100%'>
            <Image
              src={CarLogo}
              width={50}
              height={50}
              alt='a Car picture'
            />
            <Text
              w='100%'
              fontWeight={600}
              fontSize={'24px'}
            >
              &nbsp; Rent me Car
            </Text>
            <Box mr='2rem' >
              <ConnectWallet
                btnTitle='連結錢包'
              />
            </Box>
            <Box ml={'100px'} position={"fit"}>
              <Center>
                <Button
                  onClick={() => window.location.href="http://localhost:3000/dashboard"}
                >
                  Back
                </Button>
              </Center>
            </Box>
          </Center>
        </Flex>


        <Flex
          w={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={'20px'}
          height={'100px'}
          flexDirection={'column'}
        >
          <SimpleGrid
            columns={2}
            spacing={10}
            mt={'40px'}
            w={'100%'}
          >
            {/*左邊*/}
            <Box>
              <Card>
                <CardBody>
                  <Heading
                    size={'md'}
                    mb={'20px'}
                  >
                    Rent me a Car
                  </Heading>
                  <Flex>
                    <Text>Total Car : </Text>
                    <Skeleton
                      isLoaded={!loadingTotalCar}
                      width={'10px'}
                    >
                      {totalCar?.toString()}
                    </Skeleton>
                  </Flex>
                  <Text
                    fontSize={'xl'}
                    mt={'10px'}
                    py={'10px'}
                  >
                    車車名稱: 
                  </Text>
                  <Input
                    bg={'gray.100'}
                    maxLength={16}
                    // placeholder='carname'
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* <Text
                    fontSize={'xl'}
                    mt={'10px'}
                    py={'10px'}
                  >
                    租借時間
                  </Text> */}
                  {/* <NumberInput defaultValue={10} min={1} max={24} 
                    value={time}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={(e) => setTime(Math.min(time+1, 24))}/>
                      <NumberDecrementStepper onClick={(e) => setTime(Math.max(time-1, 1))}/>
                    </NumberInputStepper>
                  </NumberInput> */}
                  <Text
                    fontSize={'xl'}
                    py={'10px'}
                  >
                    你的名稱
                  </Text>
                  <Input
                    bg={'gray.100'}
                    maxLength={16}
                    placeholder='_username'
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                  />
                  <Text
                    fontSize={'xl'}
                    py={'10px'}
                  >
                    hour
                  </Text>
                  <Input
                    bg={'gray.100'}
                    maxLength={16}
                    placeholder='hour'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Text
                    fontSize={'xl'}
                    py={'10px'}
                  >
                    price
                  </Text>
                  <Input
                    bg={'gray.100'}
                    maxLength={16}
                    placeholder='price'
                    value={message2}
                    onChange={(e) => setMessage2(e.target.value)}
                  />
                  <Box mt={'20px'}>
                    <Center>
                      <Web3Button
                        contractAddress={RENTACAR_ADDRESS}
                        action={async () => {
                          await contract.call('buyCar', [name, name2, message, message2], {
                            value: message2 * message
                          })
                        }}
                        onSuccess={() => {
                          setMessage('')
                          setName('')
                          alert('成功囉')
                          window.location.href = "http://localhost:3000/dashboard"
                        }}
                        onError={(error) => {
                          alert(error)
                        }}
                      >
                        租借 {(message2 * message * 5.0e-6).toFixed(5)} Eth
                      </Web3Button>
                    </Center>
                  </Box>
                </CardBody>
              </Card>
            </Box>
            {/* <Box height={"60%"}> */}
            <Box>
              {/* <Card maxH={'50vh'} overflow={'scroll'}> */}
              <Card height={"540px"} overflow={'scroll'}>
                <CardBody>
                  <Heading
                    mb={'20px'}
                    size={'md'}
                  >
                    Who rent Car
                  </Heading>
                  {!loadingRecentCar ?
                    (
                      <Box>
                        {recentCar && recentCar?.map((Car, index) => {
                          return (
                            <Card key={index} my={'10px'}>
                              <CardBody>
                                <Flex alignItems={'center'} mb={'10px'}>
                                  <Image
                                    src={CarLogo}
                                    alt='Car'
                                    width={30}
                                    height={30}
                                    mr={'10px'}
                                  />
                                  <Text fontWeight={'bold'} mr={'10px'}>
                                    {Car[2] ? Car[2] : '匿名人士'}
                                  </Text>
                                  <Tooltip
                                    label={`Time:${dayjs.unix(Car[1]?.toString())}`}
                                    bg={'gray.200'}
                                    color={'black'}
                                  >
                                    <InfoOutlineIcon />
                                  </Tooltip>
                                </Flex>
                                <Flex>
                                  <Text mr={'10px'}>
                                    Car : {Car[5] ? Car[5] : 'no message'}
                                  </Text>
                                </Flex>
                                <Flex>
                                  <Text mr={'10px'}>
                                    Hour : {Car[3]?.toString() ? Car[3]?.toString() : 'no message'}
                                  </Text>
                                </Flex>
                              </CardBody>
                            </Card>
                          )
                        })
                        }
                        
                      </Box>
                      
                    ) : (
                      <Stack>
                        <Skeleton height={'150px'} />
                        <Skeleton height={'150px'} />
                        <Skeleton height={'150px'} />
                      </Stack>
                    )
                  }
                  
                </CardBody>
              </Card>
              
            </Box>
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
}
