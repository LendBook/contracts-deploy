import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const lbWBTC = buildModule("lbWBTC", (m) => {
  const lbwbtc = m.contract("Lbwbtc", []);


  return { lbwbtc };
});

export default lbWBTC;