import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const lbWETH = buildModule("lbWETH", (m) => {
  const lbweth = m.contract("Lbweth", []);


  return { lbweth };
});

export default lbWETH;