import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const lbUSDCtest = buildModule("lbUSDCtest", (m) => {
  const lbusdc = m.contract("Lbusdc", []);


  return { lbusdc };
});

export default lbUSDCtest;