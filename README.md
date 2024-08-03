# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## install packages

need to install chainlink for example : 
```
npm install @chainlink/contracts --save
```

Need to change the call of packages and comment this line in Book.sol:
```
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IBook} from "./interfaces/IBook.sol";
import {MathLib, WAD} from "../lib/MathLib.sol";
//import {console} from "forge-std/Test.sol";
```

## Deploy

```
nvm use 20
```

Need to set some variables https://hardhat.org/hardhat-runner/docs/guides/configuration-variables

```
npx hardhat vars set SEPOLIA_PRIVATE_KEY # wallet private key !
npx hardhat vars set ETHERSCAN_API_KEY # to verify the deployed smart contracts
npx hardhat vars set ALCHEMY_API_KEY # to connect with rpc
npx hardhat vars list
```

### To Deploy locally

```
npx hardhat node
npx hardhat ignition deploy ignition/modules/BookTest.ts --network localhost --deployment-id second-deploy
npx hardhat ignition deploy ignition/modules/LBUSDC.ts --network localhost  --deployment-id local-20240803
npx hardhat ignition deploy ignition/modules/LBWETH.ts --network localhost  --deployment-id local-20240803
npx hardhat ignition deploy ignition/modules/BookTest.ts --network localhost --deployment-id local-20240803
```

lbUSDC#Lbusdc - 0x5FbDB2315678afecb367f032d93F642f64180aa3
lbWETH#Lbweth - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512



Book.sol is too big, so need to have in hardhat.congif.ts :
```
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
```


### To Deploy on Sepolia

Besoin de changer la variable final de la requete "sepolia-fourth"
```
npx hardhat ignition deploy ignition/modules/LBUSDC.ts --network sepolia --verify --deployment-id sepolia-fourth
npx hardhat ignition deploy ignition/modules/LBWETH.ts --network sepolia --verify --deployment-id sepolia-fourth
npx hardhat ignition deploy ignition/modules/Book.ts --network sepolia --verify --deployment-id sepolia-20240716
npx hardhat ignition deploy ignition/modules/LBWBTC.ts --network sepolia --verify --deployment-id sepolia-20240722
npx hardhat ignition deploy ignition/modules/Book_LBWBTC_LBUSDC.ts --network sepolia --verify --deployment-id sepolia-20240722
npx hardhat ignition deploy ignition/modules/Book.ts --network sepolia --verify --deployment-id sepolia-20240725
npx hardhat ignition deploy ignition/modules/Book_LBWBTC_LBUSDC.ts --network sepolia --verify --deployment-id sepolia-20240725
npx hardhat ignition deploy ignition/modules/Book.ts --network sepolia --verify --deployment-id sepolia-20240803
npx hardhat ignition deploy ignition/modules/Book.ts --network sepolia --verify --deployment-id sepolia-20240803withEvents
npx hardhat ignition deploy ignition/modules/Book.ts --network sepolia --verify --deployment-id sepolia-20240803bis
```

lbUSDC#Lbusdc - 0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB
lbUSDC : https://sepolia.etherscan.io/address/0xb1aea92d4bf0bfbc2c5ba679a2819efefc998ceb

lbWETH#Lbweth - 0x25b8e42bdFC4cf8268B56B049d5C730762035407
lbWETH : https://sepolia.etherscan.io/address/0x25b8e42bdFC4cf8268B56B049d5C730762035407


lbWBTC#Lbwbtc -  0x9bd36ff85fcAb8a68b62984E8526BeD5C1Bead31
lbWBTC : https://sepolia.etherscan.io/address/0x9bd36ff85fcAb8a68b62984E8526BeD5C1Bead31

book_btc#Book_BTC -  0xC9cd8eb550c1861283D25DA9D4Fe227EEDA14105
Book_BTC : https://sepolia.etherscan.io/address/0xC9cd8eb550c1861283D25DA9D4Fe227EEDA14105

book#Book -  0x7F56bc893817380165C01e8A4894A30f21610654
Book : https://sepolia.etherscan.io/address/0x7F56bc893817380165C01e8A4894A30f21610654


book#Book - 0x0EDfc9212B4304bE1C656c6Aecb88a223874Ea91
https://sepolia.etherscan.io/address/0x0EDfc9212B4304bE1C656c6Aecb88a223874Ea91#code


book#Book - 0x4F29DaE8fFB8DB27474A774Baf5ee0A06d082389
https://sepolia.etherscan.io/address/0x4F29DaE8fFB8DB27474A774Baf5ee0A06d082389#code


book#Book - 0xa80291B8b0Ae2455698f865aF967EEd325D45834
https://sepolia.etherscan.io/address/0xa80291B8b0Ae2455698f865aF967EEd325D45834#code

then
```
(npx hardhat compile)
npx hardhat run scripts/0_mint_lbUSDC_lbWETH.ts 
npx hardhat run scripts/1_approve_lbUSDC_lbWETH.ts 
npx hardhat run scripts/2_price_feed_Book.ts
npx hardhat run scripts/3_deposit_buy_order_Book.ts 
npx hardhat run scripts/4_withdraw_buy_order_Book.ts 
npx hardhat run scripts/5_deposit_sell_order_Book.ts 
npx hardhat run scripts/6_borrow_Book.ts 
```