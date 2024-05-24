import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const lbUSDC = buildModule("lbUSDC", (m) => {
  const lbusdc = m.contract("Lbusdc", []);


  return { lbusdc };
});

export default lbUSDC;