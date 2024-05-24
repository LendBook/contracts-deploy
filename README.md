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


## Deploy

```
nvm use 20
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
```
npx hardhat ignition deploy ignition/modules/LBUSDC.ts --network sepolia --verify --deployment-id sepolia-fourth
npx hardhat ignition deploy ignition/modules/LBWETH.ts --network sepolia --verify --deployment-id sepolia-fourth
npx hardhat ignition deploy ignition/modules/Book.ts --network sepolia --verify --deployment-id sepolia-fourth
```

lbUSDC#Lbusdc - 0xB1aEa92D4BF0BFBc2C5bA679A2819Efefc998CEB

lbWETH#Lbweth - 0x25b8e42bdFC4cf8268B56B049d5C730762035407

book#Book -  0x5868e02b167C2bEe1C1a16eed9a474A792912ebF

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