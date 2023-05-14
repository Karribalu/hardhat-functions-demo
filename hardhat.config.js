require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/block-number")
/** @type import('hardhat/config').HardhatUserConfig */
require("solidity-coverage")

const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        mumbai: {
            url: POLYGON_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: POLYGON_SCAN_API_KEY,
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS ? true : false,
        // outputFile: "gas-report.txt",
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
}
