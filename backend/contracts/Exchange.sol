// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    mapping(address => mapping(address => uint256)) public tokens;

    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(address token, address user, uint256 amount, uint256 balance);
    
    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositToken(address _token, uint256 _amount) external {
        require(_amount > 0, "amount must be greater than zero");

        bool success = IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        require(success, "token transfer failed");

        tokens[_token][msg.sender] += _amount;

        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function withdrawToken(address _token, uint256 _amount) external {
        require(_amount > 0, "amount must be greater than zero");
        require(tokens[_token][msg.sender] >= _amount, "insufficient balance");

        tokens[_token][msg.sender] -= _amount;

        bool success = IERC20(_token).transfer(msg.sender, _amount);
        require(success, "token transfer failed");

        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }
}
