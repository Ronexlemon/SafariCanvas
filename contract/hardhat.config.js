require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
const KEY = process.env.KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    alfajores:{
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [KEY],
      chainId: 44787,
    },
  },
};
