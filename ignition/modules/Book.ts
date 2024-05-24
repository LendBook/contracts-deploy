import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const quoteToken : string = "0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB"; //"0x28C95A75202975B770f38DAB5C7D97927cb7e1cC"; //lbUSDC
const baseToken : string = "0x25b8e42bdFC4cf8268B56B049d5C730762035407"; //"0xB2a0c82A5c305C0B092D4984FdddE4b413a00336"; //lbWETH


// Échelle de base pour les valeurs en wei (10^18)
const wad = BigInt(Math.pow(10,18));
// Prix limite du pool genesis, soit un pool d'achat ou de vente, à ne pas confondre avec le flux de prix
const genesisLimitPrice = 4000n*wad;

// Pas de prix pour placer des ordres : +/- 10%
const priceStep = 11n*wad/10n;

// Minimum de jetons de base déposés : 0.2 ETH
const minDepositBase = wad/5n;

// Minimum de jetons de devises déposés : 200 USDC
const minDepositQuote = 200n*wad;

// LTV de liquidation = 96%
const liquidationLTV = 96n*wad/100n;


console.log('minDepositQuote:', minDepositQuote.toString());

const book = buildModule("book", (m) => {


  const book = m.contract("Book", 
  [quoteToken,
    baseToken,
    genesisLimitPrice,
    priceStep,
    minDepositBase,
    minDepositQuote,
    liquidationLTV
  ]);


  return { book };
});

export default book;