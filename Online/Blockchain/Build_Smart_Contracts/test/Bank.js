const Bank = artifacts.require("Bank");
const truffleAssert = require('truffle-assertions');

contract('Bank', (accounts) => {

    it('testing of Bank', async () => {
        const c = await Bank.deployed();
        await c.mint(accounts[1], 1000);
        var result = await c.sendMoney(accounts[2], accounts[1], 200, {from: accounts[0]});
        truffleAssert.eventEmitted(result, 'Sent');

        result = await c.getBalance(accounts[0]);
        assert.equal(0, result.toNumber(), "Banker has no money");
        result = await c.getBalance(accounts[1]);
        assert.equal(800, result.toNumber(), "Account 1 has 800");
        result = await c.getBalance(accounts[2]);
        assert.equal(200, result.toNumber(), "Account 2 has 200");
        result = await c.getBalance(accounts[2], {from: accounts[2]});
        assert.equal(200, result.toNumber(),
           "Account 2 has 200 and Account 2 can check it");        
    });
});