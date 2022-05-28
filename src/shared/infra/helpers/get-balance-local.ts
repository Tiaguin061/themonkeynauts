import Web3 from 'web3';

const web3 = new Web3('HTTP://127.0.0.1:7545');

const contractAddress = '0x6cD7c1c0268ce28C129aDa6c9d1C4325aC7BfA8Ds';
const contractFromAddress = '0xa55fae17F8ad3631B0AeA5Ae28433a972d8b6005';

const getBalance = async () => {
  const balance = await web3.eth.signTransaction({
    from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    gasPrice: '20000000000',
    gas: '21000',
    to: '0x3535353535353535353535353535353535353535',
    value: '1000000000000000000',
    data: '',
  });

  console.log(balance);
};

getBalance();
