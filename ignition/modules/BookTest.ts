import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const quoteToken : string = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //"0x28C95A75202975B770f38DAB5C7D97927cb7e1cC"; //lbUSDC
const baseToken : string = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; //"0xB2a0c82A5c305C0B092D4984FdddE4b413a00336"; //lbWETH


// Échelle de base pour les valeurs en wei (10^18)
const wad = 10n**18n;
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
console.log('liquidationLTV:', liquidationLTV.toString());

const booktest = buildModule("booktest", (m) => {


  const booktest = m.contract("Book", 
  [quoteToken,
    baseToken,
    genesisLimitPrice,
    priceStep,
    minDepositBase,
    minDepositQuote,
    liquidationLTV
  ]);


  return { booktest };
});

export default booktest;