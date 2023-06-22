const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFakeProduct = require('../ethereum/build/FakeProduct.json');

let accounts;
let product;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    product = await new web3.eth.Contract(JSON.parse(compiledFakeProduct.interface))
      .deploy({ data: compiledFakeProduct.bytecode })
      .send({ from: accounts[0], gas: "1000000" });
});


describe("Fake Product ", () => {
    it("deploys a contract", () => {
      assert.ok(product.options.address);
    });

    it("can add and retrive the product", async () => {
      const productDescription = "This product is Nike Air Jordan 3 and the color is red";
      await product.methods.addData(web3.utils.soliditySha3(productDescription),productDescription)
      .send({ from: accounts[0] ,gas : "1000000" });
      const message = await product.methods.findProduct(web3.utils.soliditySha3(productDescription)).call();
      assert.equal(message, productDescription);
      const length = await product.methods.returnSize().call();
      assert.equal(1,length);
    });

  });

