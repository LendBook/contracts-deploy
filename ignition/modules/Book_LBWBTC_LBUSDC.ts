import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const quoteToken : string = "0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB"; //"0x28C95A75202975B770f38DAB5C7D97927cb7e1cC"; //lbUSDC
const baseToken : string = "0x9bd36ff85fcAb8a68b62984E8526BeD5C1Bead31"; //"0x9bd36ff85fcAb8a68b62984E8526BeD5C1Bead31"; //lbWBTC


// Échelle de base pour les valeurs en wei (10^18)
const wad = BigInt(Math.pow(10,18));
// Prix limite du pool genesis, soit un pool d'achat ou de vente, à ne pas confondre avec le flux de prix
const genesisLimitPrice = 60000n*wad;

// Pas de prix pour placer des ordres : +/- 10%
const priceStep = 11n*wad/10n;

// Minimum de jetons de base déposés : 0.01 BTC
const minDepositBase = wad/100n;

// Minimum de jetons de devises déposés : 200 USDC
const minDepositQuote = 200n*wad;

// LTV de liquidation = 96%
const liquidationLTV = 96n*wad/100n;


console.log('minDepositQuote:', minDepositQuote.toString());

const book = buildModule("book_btc", (m) => {


  const book = m.contract("Book_BTC", 
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