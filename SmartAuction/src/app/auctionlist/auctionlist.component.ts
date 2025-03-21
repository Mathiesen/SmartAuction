import {Component, OnInit} from '@angular/core';
import {Auction} from '../models/Auction';
import {Web3Service} from '../web3.service';
import {FormsModule} from '@angular/forms';
import {AuctionitemComponent} from '../auctionitem/auctionitem.component';
import {NgForOf} from '@angular/common';
import {Web3ReadService} from '../web3-read.service';

@Component({
  selector: 'app-auctionlist',
  imports: [
    FormsModule,
    AuctionitemComponent,
    NgForOf
  ],
  templateUrl: './auctionlist.component.html',
  styleUrl: './auctionlist.component.css'
})
export class AuctionlistComponent implements OnInit {
  auctions: Auction[] = [];
  showDone: boolean = false;

  constructor(private web3Service: Web3Service, private web3read: Web3ReadService) {
  }

  ngOnInit(): void {
    this.loadAuctions();
  }

  protected async loadAuctions() {
    await this.web3read.getAllAuctions()
      .then(async auctions => {
        const mapped = auctions.map(async auction => {
          return {
            auctionAddr: auction.auctionAddr,
            name: auction.name,
            description: auction.description,
            condition: auction.condition,
            startDate: auction.startDate,
            endDate: auction.endDate,
            bids: []
          }
        });

        const mappedAwait: Auction[] = await Promise.all(mapped);


        this.auctions = mappedAwait.filter(auction => {
          if (!this.showDone) {
            return auction.endDate.getTime() > Date.now();
          }
          return true;
        });
      });
  }
}
