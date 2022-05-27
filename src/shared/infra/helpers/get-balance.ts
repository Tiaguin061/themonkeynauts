import Web3 from 'web3';

const web3 = new Web3('https://mainnet.infura.io/v3/ea9cb2d6e94444e79abc9cfb9621ced3')

const contractAddress = '0x4Fabb145d64652a948d72533023f6E7A623C7C53'

const getBalance = async () => {
    const balance = await web3.eth.getBalance(contractAddress)
    const balanceFormatted = web3.utils.fromWei(balance, 'ether')

    console.log(balance, balanceFormatted)

}

getBalance()