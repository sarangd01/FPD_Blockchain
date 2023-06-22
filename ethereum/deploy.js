const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const product = require('./build/FakeProduct.json');

const provider = new HDWalletProvider(
    'melt deny asset report tennis hurdle little cook suffer jewel smooth chronic',
    'https://sepolia.infura.io/v3/dc7b3a5ad8804907afe9667b75aa4f13'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(product.interface)
  )
    .deploy({ data: product.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();