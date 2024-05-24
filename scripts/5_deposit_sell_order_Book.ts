import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
const { vars } = require("hardhat/config");

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

// Adresse book sepolia
const bookAddress = "0x5868e02b167C2bEe1C1a16eed9a474A792912ebF";
const genesisPoolId = BigInt(1111111113);

async function main() {
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
  const privateKey = SEPOLIA_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // book instance
  const bookAbiPath = path.resolve(__dirname, "../artifacts/contracts/Book.sol/Book.json");
  const bookContractJson = JSON.parse(fs.readFileSync(bookAbiPath, "utf8"));
  const bookAbi = bookContractJson.abi;
  const book = new ethers.Contract(bookAddress, bookAbi, wallet);

  // sell order 
  const poolId = genesisPoolId;
  const depositQuantity = ethers.parseUnits("20", 18);
  const pairedPoolId = BigInt(0);

  const depositSellOrder_tx = await book.deposit(poolId, depositQuantity, pairedPoolId);
  console.log("depositSellOrder_tx hash:", depositSellOrder_tx.hash);
  await depositSellOrder_tx.wait();


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});