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
```

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
```

lbUSDC#Lbusdc - 0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB
lbUSDC : https://sepolia.etherscan.io/address/0xb1aea92d4bf0bfbc2c5ba679a2819efefc998ceb

lbWETH#Lbweth - 0x25b8e42bdFC4cf8268B56B049d5C730762035407
lbWETH : https://sepolia.etherscan.io/address/0x25b8e42bdFC4cf8268B56B049d5C730762035407

book#Book -  0x722166584cEcBD8B1730e80805437F7B2e5833b1
Book : https://sepolia.etherscan.io/address/0x722166584cEcBD8B1730e80805437F7B2e5833b1

lbWBTC#Lbwbtc -  0x9bd36ff85fcAb8a68b62984E8526BeD5C1Bead31
lbWBTC : https://sepolia.etherscan.io/address/0x9bd36ff85fcAb8a68b62984E8526BeD5C1Bead31

book_btc#Book_BTC -  0x5BEd8d050c7e574604e0f6Db9e171c171C642187
Book_BTC : https://sepolia.etherscan.io/address/0x5BEd8d050c7e574604e0f6Db9e171c171C642187

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