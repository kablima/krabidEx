import { expect } from "chai";
import { network } from "hardhat";

describe("Exchange", function () {
    async function deployExchangeFixture() {
    const { ethers } = await network.connect();
    const feePercent = 10n;
    const [deployer, feeAccount] = await ethers.getSigners();
    const exchange = await ethers.deployContract("Exchange", [feeAccount.address, feePercent]);
        return { exchange, feePercent, deployer, feeAccount, ethers };
    }
    
    it("tracks the fee account", async function () {
    const { exchange, feeAccount } = await deployExchangeFixture();
    expect(await exchange.feeAccount()).to.equal(feeAccount.address);
    });
    
    it("tracks the fee percent", async function () {
    const { exchange, feePercent } = await deployExchangeFixture();
    expect(await exchange.feePercent()).to.equal(feePercent);
    });
});
