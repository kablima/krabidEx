import { expect } from "chai";
import { network } from "hardhat";

describe("Token", function () {
  async function deployTokenFixture() {
    const { ethers } = await network.connect();
    const initialSupply = ethers.parseUnits("1000000", 18);
    const token = await ethers.deployContract("Token", [initialSupply]);
    const [owner, addr1] = await ethers.getSigners();
    
    return { token, initialSupply, owner, addr1, ethers };
  }
  
  it("sets the total supply to the deployer", async function () {
    const { token, initialSupply, owner } = await deployTokenFixture();
    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });
  
  it("sets the correct token name and symbol", async function () {
    const { token } = await deployTokenFixture();
    expect(await token.name()).to.equal("Moneda");
    expect(await token.symbol()).to.equal("MON");
  });
  
  it("transfers tokens between accounts", async function () {
    const { token, owner, addr1, ethers } = await deployTokenFixture();
    const transferAmount = ethers.parseUnits("100", 18);
    await token.transfer(addr1.address, transferAmount);
    expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);
    expect(await token.balanceOf(owner.address)).to.equal(
      (await token.totalSupply()) - transferAmount
    );
  });
});
