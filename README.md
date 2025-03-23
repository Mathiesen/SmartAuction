# SmartAuction Installation Guide

This guide provides step-by-step instructions to set up and run the SmartAuction project locally. The project is divided into three main components:

- **SmartAuctionContract**: Contains the Solidity smart contracts, migrations, and tests.
- **SmartAuctionFrontend**: An Angular-based frontend application.
- **FinalizationAPI**: A Node.js backend that handles auction finalization and off-chain processes.

Below is the project directory structure for reference:

```
SmartAuction
├── FinalizationAPI
├── SmartAuctionContract
│   ├── contracts
│   ├── migrations
│   └── test
└── SmartAuctionFrontend
    ├── public
    └── src
        └── app
            ├── auctionitem
            ├── auctionlist
            ├── createauction
            ├── models
            └── timer
```

---

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js and npm**: [Download Node.js](https://nodejs.org/)
- **Truffle** (for smart contracts):
  ```bash
  npm install -g truffle
  ```
- **Ganache** (for a local Ethereum blockchain): [Download Ganache](https://www.trufflesuite.com/ganache)
- **Angular CLI** (for the frontend):
  ```bash
  npm install -g @angular/cli
  ```

---

## Step 1: Clone the Repository

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone https://github.com/Mathiesen/SmartAuction.git
cd SmartAuction
```

---

## Step 2: Set Up the SmartAuctionContract (Smart Contracts)

### 2.1. Install Dependencies

Navigate to the **SmartAuctionContract** directory and install dependencies:

```bash
cd SmartAuctionContract
npm install
```

### 2.2. Start Ganache

Launch Ganache to run a local Ethereum blockchain. Ensure it is running on the default port (usually `7545`).

### 2.3. Compile and Deploy Contracts

Compile your Solidity contracts:

```bash
truffle compile
```

Deploy the contracts to the local blockchain (ensure your `truffle-config.js` is set for the development network):

```bash
truffle migrate --network development
```

### 2.4. (Optional) Run Contract Tests

If you have tests set up in the **test** folder:

```bash
truffle test
```

---

## Step 3: Set Up the SmartAuctionFrontend (Angular Frontend)

### 3.1. Install Dependencies

Navigate to the **SmartAuctionFrontend** directory:

```bash
cd ../SmartAuctionFrontend
```

Install the required npm packages:

```bash
npm install
```

### 3.2. Configure the Frontend

- Update any necessary configuration files (such as environment files) with the contract addresses and network settings deployed in Step 2.

### 3.3. Run the Angular Application

Start the Angular development server:

```bash
ng serve
```

The application will be available at [http://localhost:4200](http://localhost:4200).

---

## Step 4: Set Up the FinalizationAPI (Node.js Backend)

### 4.1. Install Dependencies

Navigate to the **FinalizationAPI** directory:

```bash
cd ../FinalizationAPI
```

Install the dependencies:

```bash
npm install
```

### 4.2. Configure the Backend

- Update your configuration (e.g., `.env` file) with the correct Ethereum node URL, contract addresses, and any other required settings.

### 4.3. Start the API Server

Launch the backend server:

```bash
npm start
```

The server should connect to your local blockchain and handle off-chain auction finalization tasks.

---

## Final Steps

- **Access the DApp:**  
  Open your web browser and navigate to [http://localhost:4200](http://localhost:4200) to interact with the SmartAuction DApp.

- **Troubleshooting:**
    - Ensure Ganache is running and connected.
    - Confirm that contract addresses in the frontend and backend configuration files match those deployed.
    - Check the terminal and browser console for error messages if something isn’t working as expected.

---

This guide should help you install and run the SmartAuction project locally. If you encounter any issues or need further assistance, please open an issue in the repository.