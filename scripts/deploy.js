//imports
const { ethers, run, network } = require("hardhat")

//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    // Start deployment, returning a promise that resolves to a contract object
    console.log("Deploying SimpleStorage...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    // Wait for deployment to complete
    await simpleStorage.deployed()
    console.log("SimpleStorage deployed to:", simpleStorage.address)

    if (network.config.chainId === 80001 && process.env.POLYGON_SCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(5)
        await verifyContract(simpleStorage.address)
    }

    const currentValue = await simpleStorage.retrieve()
    console.log("Current value stored in contract:", currentValue.toString())

    //Update the value
    console.log("Updating contract...")
    const tx = await simpleStorage.store(13)
    // Wait for transaction to complete
    await tx.wait()
    console.log("Contract updated!")

    const updatedValue = await simpleStorage.retrieve()
    console.log("Updated value stored in contract:", updatedValue.toString())
    
}

async function verifyContract(contractAddress, args) {
    console.log("Verifying contract at address: ", contractAddress)
    try {
        await run("verify:verify", {
            address: contractAddress,
        })
    } catch (error) {
        if (error.message.includes("Contract source code already verified")) {
            console.log("Contract source code already verified")
        } else {
            console.log(error)
        }
    }
}
//main

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
