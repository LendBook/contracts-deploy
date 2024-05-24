// SPDX-License-Identifier: MIT
// Author: @skaha

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {WAD} from "../lib/MathLib.sol";

contract Lbusdc is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1e15 * WAD;
    constructor()
        ERC20("lbUSDC", "lbUSDC")
    {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
