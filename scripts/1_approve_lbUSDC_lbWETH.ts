import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and add its key to the configuration variables
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");


// Adresse book sepolia
const bookAddress = "0x5868e02b167C2bEe1C1a16eed9a474A792912ebF";
const lbusdcAddress = "0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB";
const lbwethAddress = "0x25b8e42bdFC4cf8268B56B049d5C730762035407";
const publicWalletAddress = "0xebC35802D0A2D210dF744850e4490E424d53bF04";

async function main() {
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
  const privateKey = SEPOLIA_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // book instance
  const bookAbiPath = path.resolve(__dirname, "../artifacts/contracts/Book.sol/Book.json");
  const bookContractJson = JSON.parse(fs.readFileSync(bookAbiPath, "utf8"));
  const bookAbi = bookContractJson.abi;
  const book = new ethers.Contract(bookAddress, bookAbi, wallet);

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

  const amount = ethers.parseUnits("100000000", 18); // 1000000 tokens

  // approve lbUSDC
  const lbusdc_approve_tx = await lbusdc.approve(bookAddress, amount);
  console.log("lbusdc_approve_tx hash:", lbusdc_approve_tx.hash);
  await lbusdc_approve_tx.wait();
  console.log(`Approved ${amount.toString()} tokens to ${bookAddress}`);


  // approve lbWETH
  const lbweth_approve_tx = await lbweth.approve(bookAddress, amount);
  console.log("lbweth_approve_tx hash:", lbweth_approve_tx.hash);
  await lbweth_approve_tx.wait();
  console.log(`Approved ${amount.toString()} tokens to ${bookAddress}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});