import 'dotenv/config';
import Web3 from 'web3';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.NODE_URL));
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "itemAddr",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "highBidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "winningBid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payout",
        "type": "uint256"
      }
    ],
    "name": "AuctionFinalized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "auctionItemAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "AuctionItemCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "itemId",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BidPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "finalized",
        "type": "bool"
      }
    ],
    "name": "DebugLog",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "itemAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "items",
    "outputs": [
      {
        "internalType": "contract AuctionItem",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pendingReturns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "condition",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "created",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "done",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "estimate",
        "type": "string"
      }
    ],
    "name": "addAuctionItem",
    "outputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getAuctionItem",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAuctionItems",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "names",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "descriptions",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "conditions",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "created",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "done",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "estimates",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "currentBids",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "contractAddresses",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "auctionAddr",
        "type": "address"
      }
    ],
    "name": "getSeller",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "itemAddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "bidId",
        "type": "uint256"
      }
    ],
    "name": "getBid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "itemAddr",
        "type": "address"
      }
    ],
    "name": "getBids",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "bidCreated",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "bidders",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "bidAmount",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "itemAddr",
        "type": "address"
      }
    ],
    "name": "addBid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "itemAddr",
        "type": "address"
      }
    ],
    "name": "finalizeAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];  // Replace with your ABI
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

contract.events.AuctionFinalized()
  .on('data', (event) => {
    const { itemAddr, seller, highBidder, winningBid, payout } = event.returnValues;
    console.log(`Auction ${itemAddr} was sold for ${web3.utils.fromWei(winningBid, "ether")} eth by ${highBidder}.`);
    console.log(`After commision, ${web3.utils.fromWei(payout, "ether")} eth will be transfered to ${seller}`);

  });

if (!process.env.PRIVATE_KEY) {
  console.error("❌ PRIVATE_KEY is missing in .env file!");
  process.exit(1);
}

// Load wallet from private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
console.log(`✅ Wallet Loaded: ${account.address}`);

app.post('/finalize-auction', async (req, res) => {
    const { itemAddr } = req.body;
    console.log(itemAddr);

    try {
        console.log(`Finalizing auction for item: ${itemAddr}`);

        // Estimate gas
        const tx = contract.methods.finalizeAuction(itemAddr);
        const gas = await tx.estimateGas({ from: account.address });
        console.log(`Gas: ${gas}`);

        const gasPrice = await web3.eth.getGasPrice();
        console.log(`Gas price: ${gasPrice}`);

        const nonce = await web3.eth.getTransactionCount(account.address, 'latest');

        // Sign and send the transaction
        const signedTx = await account.signTransaction({
            to: process.env.CONTRACT_ADDRESS,
            from: account.address,
            nonce,
            data: tx.encodeABI(),
            gas,
            gasPrice,
        });

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`Auction finalized! Transaction Hash: ${receipt.transactionHash}`);
    
        res.json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error("Error finalizing auction:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start API Server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));


