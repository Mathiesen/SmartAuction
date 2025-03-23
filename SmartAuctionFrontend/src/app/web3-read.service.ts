import { Injectable } from '@angular/core';
import {ABI} from './ABI';
import {Auction} from './models/Auction';
import Web3 from 'web3';
import {Bid} from "./models/Bid";

@Injectable({
  providedIn: 'root'
})
export class Web3ReadService {
  private nodeUrl = 'http://127.0.0.1:8545';
  private web3Read!: Web3;
  private auctionAddress = '0xc6c283A0E6dd101704aFC7f1B8252EC1BbA2F049';
  private contract!: any;

  constructor() {
    this.web3Read = new Web3(this.nodeUrl);
    this.contract = new this.web3Read.eth.Contract(ABI.abi, this.auctionAddress);
  }

  public async getAllAuctions(): Promise<Auction[]> {
    //await this.ensureInitialized();
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
        bids: await this.getBidsForAuctions(auctions[7][i].toString())
      });
    }
    return formattedItems;
  }

  public async getBidsForAuctions(auctionAddr: string): Promise<Bid[]> {
    //await this.ensureInitialized();
    let bids = await this.contract.methods.getBids(auctionAddr).call();
    const formattedItems: Bid[] = [];

    for (let i = 0; i < bids[0].length; i++) {
      formattedItems.push({
        created: new Date(Number(bids[0][i]) * 1000),
        bidder: bids[1][i],
        amount: this.web3Read.utils.fromWei(bids[2][i].toString(), 'ether') + " ETH"
      })
    }

    return formattedItems;
  }
}
