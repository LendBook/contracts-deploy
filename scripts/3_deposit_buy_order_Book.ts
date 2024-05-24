import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
const { vars } = require("hardhat/config");

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

// Adresse book sepolia
const bookAddress = "0x5868e02b167C2bEe1C1a16eed9a474A792912ebF";

async function main() {
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
  const privateKey = SEPOLIA_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // book instance
  const bookAbiPath = path.resolve(__dirname, "../artifacts/contracts/Book.sol/Book.json");
  const bookContractJson = JSON.parse(fs.readFileSync(bookAbiPath, "utf8"));
  const bookAbi = bookContractJson.abi;
  const book = new ethers.Contract(bookAddress, bookAbi, wallet);

  // buy order 
  let genesisPoolId = BigInt(1111111110);
  let depositQuantity = ethers.parseUnits("30000", 18);
  let pairedPoolId = BigInt(1111111111);

  let depositBuyOrder_tx = await book.deposit(genesisPoolId, depositQuantity, pairedPoolId);
  console.log("depositBuyOrder_tx hash:", depositBuyOrder_tx.hash);
  await depositBuyOrder_tx.wait();

  // lend 
  genesisPoolId = BigInt(1111111108);
  depositQuantity = ethers.parseUnits("40000", 18);
  pairedPoolId = BigInt(1111111109);

  depositBuyOrder_tx = await book.deposit(genesisPoolId, depositQuantity, pairedPoolId);
  console.log("depositBuyOrder_tx hash:", depositBuyOrder_tx.hash);
  await depositBuyOrder_tx.wait();

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});