# krabidEx 🦀 — Pre-Alpha

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Status](https://img.shields.io/badge/status-pre--alpha-orange)
![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636)
![Hardhat](https://img.shields.io/badge/Hardhat-3-F7DF1E?logo=ethereum&logoColor=000)

A decentralized exchange project being built in public, starting from the smart-contract backend first.

The current priority: build the core contracts, test them properly, and turn the repo into a real portfolio-grade dEX step by step.

---

## Current Status

This repository is no longer just a scaffold.

### Current backend checkpoint

- Hardhat 3 initialized inside `backend/`
- Solidity configured to `0.8.28`
- OpenZeppelin contracts installed
- ERC-20 `Token.sol` implemented
- Core `Exchange.sol` implemented with deposit / withdraw logic
- JavaScript tests for both `Token` and `Exchange`
- `npx hardhat test` / `npm test` workflow active

There is **no frontend, no public testnet deployment, no live trading flow, and no audit** yet.

---

## Implemented Now


### Token and Exchange contracts

`Token.sol` is a basic ERC-20 token built with OpenZeppelin.


### Exchange contract

`Exchange.sol` currently includes:

- `feeAccount`
- `feePercent`
- `mapping(address => mapping(address => uint256)) public tokens`
- `depositToken(token, amount)`
- `withdrawToken(token, amount)`
- `Deposit` and `Withdraw` events

Important honesty point:

- `feeAccount` and `feePercent` are already stored in the contract
- fee-charging logic is **not applied yet** in deposit / withdraw or trading flows

---

## Tests Present

### Token tests

Current coverage includes:

- total supply assigned to deployer
- correct token name and symbol
- token transfers between accounts

### Exchange tests

Current coverage includes:

- tracks `feeAccount`
- tracks `feePercent`
- deposit updates internal balance
- exchange actually receives tokens
- withdraw updates internal balance
- cannot withdraw more than deposited

---

## Tech Stack

- Solidity `0.8.28`
- Hardhat `3`
- ethers-based Hardhat toolbox
- OpenZeppelin Contracts
- Mocha / Chai
- Node.js

---

## Current Structure

```text
krabidEx/
├── .gitignore
├── LICENSE
├── README.md
└── backend/
    ├── package.json
    ├── package-lock.json
    ├── hardhat.config.ts
    ├── tsconfig.json
    ├── contracts/
    │   ├── Token.sol
    │   └── Exchange.sol
    └── test/
        ├── Token.js
        └── Exchange.js
```

---

## Quick Start

Clone the repository:

```bash
git clone git@github.com:kablima/krabidEx.git
cd krabidEx
```

Install backend dependencies:

```bash
cd backend
npm install
```

Run tests:

```bash
npx hardhat test
```

Or:

```bash
npm test
```

---

## Roadmap

### Done

- [x] Initialize backend project
- [x] Configure Hardhat 3
- [x] Add ERC-20 token contract
- [x] Add token tests
- [x] Add exchange contract skeleton with deposit / withdraw core
- [x] Add exchange tests

### Next

- [ ] Add stronger event and revert-path test coverage
- [ ] Add order-book / trading logic
- [ ] Add fee application logic
- [ ] Add deployment workflow
- [ ] Add frontend integration
- [ ] Add wallet connection
- [ ] Prepare public testnet deployment

---

## Disclaimer

**Pre-alpha. Not audited. Do not use with real funds.**

---

## License

This repository is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.