import { expect } from "chai";
import { network } from "hardhat";

describe("Exchange", function () {
    async function deployExchangeFixture() {
        const { ethers } = await network.connect();
        const feePercent = 10n;
        const tokens = ethers.parseUnits("1000000", 18);
        const [deployer, feeAccount] = await ethers.getSigners();
        const token = await ethers.deployContract("Token", [tokens]);
        const exchange = await ethers.deployContract("Exchange", [feeAccount.address, feePercent]);

        return { exchange, feePercent, deployer, feeAccount, token, ethers };
    }
    
    it("tracks the fee account", async function () {
        const { exchange, feeAccount } = await deployExchangeFixture();
        expect(await exchange.feeAccount()).to.equal(feeAccount.address);
    });
    
    it("tracks the fee percent", async function () {
        const { exchange, feePercent } = await deployExchangeFixture();
        expect(await exchange.feePercent()).to.equal(feePercent);
    });

    it("deposit updates internal balance", async function () {
        const { exchange, token, deployer } = await deployExchangeFixture();
        const amount = 100n;

        await token.approve(exchange.target, amount);
        await exchange.depositToken(token.target, amount);

        expect(await exchange.tokens(token.target, deployer.address)).to.equal(amount);
    });

    it("exchange receives tokens", async function () {
        const { exchange, token } = await deployExchangeFixture();
        const amount = 100n;

        await token.approve(exchange.target, amount);
        await exchange.depositToken(token.target, amount);

        expect(await token.balanceOf(exchange.target)).to.equal(amount);
    });

    it("withdraw updates internal balance", async function () {
        const { exchange, token, deployer } = await deployExchangeFixture();
        const depositAmount = 100n;
        const withdrawAmount = 40n;

        await token.approve(exchange.target, depositAmount);
        await exchange.depositToken(token.target, depositAmount);
        await exchange.withdrawToken(token.target, withdrawAmount);

        expect(await exchange.tokens(token.target, deployer.address)).to.equal(60n);
    });

    it("cannot withdraw more than deposited", async function () {
        const { exchange, token } = await deployExchangeFixture();
        const depositAmount = 100n;

        await token.approve(exchange.target, depositAmount);
        await exchange.depositToken(token.target, depositAmount);

        await expect(exchange.withdrawToken(token.target, 101n)).to.be.revertedWith("insufficient balance");
    });
});
