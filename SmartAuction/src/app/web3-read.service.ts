import { Injectable } from '@angular/core';
import web3 from 'web3';
import {ABI} from './ABI';
import {Auction} from './models/Auction';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3ReadService {
  private nodeUrl = 'http://127.0.0.1:7545';
  private web3Read;
  private auctionAddress = '0x3E8c20BB9862d47544eEA81Be78Ec0E4677Fea0b';
  private contract;

  constructor() {
  this.web3Read = new Web3(this.nodeUrl);
  this.auctionAddress = '0x3E8c20BB9862d47544eEA81Be78Ec0E4677Fea0b';
  this.contract = new this.web3Read.eth.Contract(ABI.abi, this.auctionAddress);
  }

  public async getAllAuctions(): Promise<Auction[]> {
    //await this.ensureInitialized();
    const auctions: any = await this.contract.methods['getAuctionItems']().call();

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
}
