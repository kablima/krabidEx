import { expect } from "chai";
import { network } from "hardhat";

describe("Token", function () {
  async function deployTokenFixture() {
    const { ethers } = await network.connect();
    const initialSupply = ethers.parseUnits("1000000", 18);
    const token = await ethers.deployContract("Token", [initialSupply]);
    return { token, initialSupply, ethers };
  }
  it("sets the total supply to the deployer", async function () {
    const { token, initialSupply, ethers } = await deployTokenFixture();
    const [owner] = await ethers.getSigners();
    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });
});