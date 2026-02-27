# krabidEx 🦀 — Pre-Alpha

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Status](https://img.shields.io/badge/status-pre--alpha-orange)
![Solidity](https://img.shields.io/badge/Solidity-0.8.x-363636)
![Hardhat](https://img.shields.io/badge/Hardhat-local-F7DF1E?logo=ethereum&logoColor=000)

Experimental decentralized exchange (dEX) scaffold powered by **Hardhat + Ignition (ethers v6)** and **Solidity 0.8.x**.

> Current focus: backend / smart-contract foundation first.  
> Frontend and public testnet deployment come later.

---

## Status

This repository is currently in an **early public build** stage.

Implemented / present now:

- Git repository initialized
- Backend Node setup started
- Hardhat-based workflow in progress
- Public repo structure being prepared

Planned next:

- ERC-20 token contracts
- Exchange core contract
- Unit tests
- Ignition deployment modules
- Frontend integration

---

## Tech Stack

- **Solidity 0.8.x**
- **Node.js 20.x**
- **Hardhat**
- **Hardhat Ignition**
- **ethers v6**
- **Mocha / Chai**
- **Vite + React** *(planned)*

---

## Current Folder Structure

```text
krabidEx/
├── .gitignore
├── LICENSE
├── README.md
└── backend/
    ├── package.json
    └── package-lock.json
```

---

## Roadmap

- [ ] Initialize Hardhat project structure inside `backend/`
- [ ] Add ERC-20 token contract
- [ ] Add transfer / approval / allowance tests
- [ ] Add exchange contract
- [ ] Add deposit / withdraw flows
- [ ] Add Ignition deployment modules
- [ ] Connect frontend wallet
- [ ] Prepare testnet deployment

---

## Quick Start

Clone the repository:

```bash
git clone git@github.com:kablima/krabidEx.git
cd krabidEx
```

Backend setup:

```bash
cd backend
npm install
```

When Hardhat scaffold and tests are ready:

```bash
npx hardhat test
```

---

## Build Philosophy

`krabidEx` is being built in public, from the ground up, with the goal of becoming a real portfolio-grade Web3 project rather than a fake polished shell.

This repo will show the actual progression:

- setup
- mistakes
- fixes
- contract logic
- testing
- integration

---

## Disclaimer

**Pre-alpha. Not audited. Do not use with real funds.**

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.
