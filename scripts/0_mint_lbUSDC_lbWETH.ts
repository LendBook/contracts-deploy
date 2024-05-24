import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and add its key to the configuration variables
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

// Adresse du contrat déployé LBUSDC
const lbusdcAddress = "0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB";
const lbwethAddress = "0x25b8e42bdFC4cf8268B56B049d5C730762035407";
const publicWalletAddress = "0xebC35802D0A2D210dF744850e4490E424d53bF04";

async function main() {
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
  const privateKey = SEPOLIA_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // lbUSDC instance
  const lbusdcAbiPath = path.resolve(__dirname, "../artifacts/contracts/LBUSDC.sol/Lbusdc.json");
  const lbusdcContractJson = JSON.parse(fs.readFileSync(lbusdcAbiPath, "utf8"));
  const lbusdcAbi = lbusdcContractJson.abi;
  const lbusdc = new ethers.Contract(lbusdcAddress, lbusdcAbi, wallet);

  // lbWETH instance
  const lbwethAbiPath = path.resolve(__dirname, "../artifacts/contracts/LBWETH.sol/Lbweth.json");
  const lbwethContractJson = JSON.parse(fs.readFileSync(lbwethAbiPath, "utf8"));
  const lbwethAbi = lbwethContractJson.abi;
  const lbweth = new ethers.Contract(lbwethAddress, lbwethAbi, wallet);

  // Adresse et montant pour la mint
  const amount = ethers.parseUnits("100000000", 18); // 1000000 tokens

  // Appel de la fonction mint lbUSDC
  const lbusdc_mint_tx = await lbusdc.mint(publicWalletAddress, amount);
  console.log("lbusdc_mint_tx hash:", lbusdc_mint_tx.hash);
  await lbusdc_mint_tx.wait();
  console.log(`Minted ${amount.toString()} tokens to ${publicWalletAddress}`);

  // Appel de la fonction mint lbWETH
  const lbweth_mint_tx = await lbweth.mint(publicWalletAddress, amount);
  console.log("lbweth_mint_tx hash:", lbweth_mint_tx.hash);
  await lbweth_mint_tx.wait();
  console.log(`Minted ${amount.toString()} tokens to ${publicWalletAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});