const {ethers} = require("hardhat")
//NFTMinterAddress =   0x27B077Ed737A96DF0AEF221AbDFb5f0751Ed6feE
//NFTMarketAddress =   0x6fCc2165026F17b4555c3445d7adC2f67CE99EB3
//2.
//NFTMinterAddress =   0x8B58ca13291Dc15A7e8Af29286aA77398DE443Eb
//NFTMarketAddress =   0x95628f9d635F8fe180254f1DF6E41202b582d02c
async function main(){

    //get the nft contract
    const NFTMinter = await ethers.getContractFactory("NftMarket");
    const NFTMinterDeploy = await NFTMinter.deploy();
    await NFTMinterDeploy.deployed();
    console.log("NFTMinterAddress =  ",NFTMinterDeploy.address);
    //get the market contract
    const NFTMarket = await ethers.getContractFactory("NFTMarketplace");
    const NFTMarketDeploy = await NFTMarket.deploy();
    await NFTMarketDeploy.deployed();
    console.log("NFTMarketAddress =  ",NFTMarketDeploy.address);
}
main().then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})