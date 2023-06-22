import web3 from './web3';
import Product from './build/FakeProduct.json';

const instance = new web3.eth.Contract(
  JSON.parse(Product.interface),
  '0x6518BFeCAa6D6b50bd09CA85AdC0BBd8FD2C3802'
);

export default instance;