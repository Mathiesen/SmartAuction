import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {Contract} from './contract';
import web3 from 'web3';
import {Bid} from './models/Bid';
import {Subject} from 'rxjs';
import {Auction} from './models/Auction';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3!: Web3;
  private contract!: any;
  private isInitialized = false;

  public bidPlacedEvent: Subject<void> = new Subject();

  constructor() {
    this.initWeb3().then(() => {
      this.contract.events.AuctionItemCreated()
        .on('data', (event: any) => {
        console.log(event);
      });

      this.contract.events.AuctionFinalized()
        .on('data', (event: any) => {
          console.log(event);
        });

      this.contract.events.BidPlaced()
        .on('data', (event: any) => {
          console.log(event);
          this.bidPlacedEvent.next(event);
        });
    });
  }

  private async initWeb3() {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3((window as any).ethereum);
        this.contract = new this.web3.eth.Contract(Contract.abi, Contract.address);
        this.isInitialized = true;
      } catch (error) {
        console.error('User denied account access', error);
      }
    } else {
      console.warn('No Ethereum provider found. Please install MetaMask!');
    }
  }

  private async ensureInitialized(): Promise<void> {
    while (!this.isInitialized) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for Web3 to initialize
    }
  }

  public async getAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    return accounts.length > 0 ? accounts[0] : '';
  }


  public async getAllAuctions(): Promise<Auction[]> {
    await this.ensureInitialized();
    const auctions = await this.contract.methods.getAuctionItems().call();

    const formattedItems: Auction[] = [];

    for (let i = 0; i < auctions[0].length; i++) {
      formattedItems.push({
        name: auctions[0][i],
        description: auctions[1][i],
        condition: auctions[2][i],
        startDate: new Date(Number(auctions[3][i])),
        endDate: new Date(Number(auctions[4][i])),
        //estimate: auctions[5][i],
        //currentBid: web3.utils.fromWei(auctions[6][i].toString(), 'ether') + " ETH",
        auctionAddr: auctions[7][i].toString(),
        bids: []
      });
    }
    return formattedItems;
  }

  public async getBidsForAuctions(auctionAddr: string): Promise<Bid[]> {
    await this.ensureInitialized();
    let bids = await this.contract.methods.getBids(auctionAddr).call();
    const formattedItems: Bid[] = [];

    for (let i = 0; i < bids[0].length; i++) {
      formattedItems.push({
        created: new Date(Number(bids[0][i]) * 1000),
        bidder: bids[1][i],
        amount: web3.utils.fromWei(bids[2][i].toString(), 'ether') + " ETH"
      })
    }

    return formattedItems;
  }

  public async finalizeAuction(itemAddr: string) {
    fetch("http://localhost:3000/finalize-auction", {
      method: "POST",
      body: JSON.stringify({ itemAddr: itemAddr }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => console.log("Finalization result", data))
      .catch(error => console.log("Error finalizing:", error));
  }

  public async createAuction(auctionData: any): Promise<any> {
    const account = await this.getAccount();

    return new Promise((resolve, reject) => {
      this.contract.methods.addAuctionItem(
        auctionData.name,
        auctionData.description,
        auctionData.condition,
        new Date(auctionData.start).getTime(),
        new Date(auctionData.end).getTime(),
        auctionData.estimate)
        .send({ from: account })
        .on("receipt", (receipt: any) => {
          if (receipt.events && receipt.events.AuctionItemCreated) {
            const event = receipt.events.AuctionItemCreated.returnValues;
            const formattedEvent = {
              auctionItemAddress: event.auctionItemAddress
            };

            resolve(JSON.stringify(formattedEvent, null, 2));
          } else {
            resolve(null);
          }
        });
    });
  }

  public async addBid(auctionAddr: string, bidAmount: number): Promise<any> {
    const account = await this.getAccount();
    const bidInWei = this.web3.utils.toWei(bidAmount.toString(), 'ether');

    return new Promise((resolve, reject) => {
      this.contract.methods.addBid(auctionAddr)
        .send({ value: bidInWei, from: account })
        .on("receipt", (receipt: any) => {
          if (receipt.events && receipt.events.BidPlaced) {
            const event = receipt.events.BidPlaced.returnValues;
            const formattedEvent = {
              auctionAddr: event.itemId,
              bidder: event.bidder,
              amount: this.web3.utils.fromWei(event.amount, 'ether') + " ETH"
            };

            resolve(JSON.stringify(formattedEvent, null, 2));
          } else {
            resolve(null);
          }
        })
        .on("error", (error: any, receipt: any)=> {
          console.log("ERROR");
          console.error(error);
          console.log(receipt);
        });
    });
  }
}
