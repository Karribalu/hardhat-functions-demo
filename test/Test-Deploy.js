const { assert, expect } = require("chai")
const { ethers } = require("hardhat")
require("hardhat-gas-reporter")
describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should deploy and update storage", async () => {
        await simpleStorage.deployed()
        expect(await simpleStorage.retrieve()).to.equal(0)
    })

    it("Should emit event when storage is updated", async () => {
        await simpleStorage.deployed()
        const tx = await simpleStorage.store(13)
        await tx.wait(1)
        const value = await simpleStorage.retrieve()
        expect(value).to.equal(13)
    })

    it("Should store person and favorite number", async () => {
        await simpleStorage.deployed()
        await simpleStorage.addPerson("Alice", 23)
        const person = await simpleStorage.nameToFavoriteNumber("Alice")
        expect(person).to.equal(23)
    })
})
