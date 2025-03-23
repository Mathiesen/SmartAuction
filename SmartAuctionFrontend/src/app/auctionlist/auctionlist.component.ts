import {Component, OnInit} from '@angular/core';
import {Auction} from '../models/Auction';
import {FormsModule} from '@angular/forms';
import {AuctionitemComponent} from '../auctionitem/auctionitem.component';
import {NgForOf, NgIf} from '@angular/common';
import {Web3ReadService} from '../web3-read.service';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auctionlist',
  imports: [
    FormsModule,
    AuctionitemComponent,
    NgForOf,
    MatSlideToggle,
    MatIcon,
    MatButton,
    RouterLink,
    NgIf
  ],
  templateUrl: './auctionlist.component.html',
  styleUrl: './auctionlist.component.css'
})
export class AuctionlistComponent implements OnInit {
  auctions: Auction[] = [];
  showDone: boolean = false;

  constructor(private web3read: Web3ReadService) {
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
            bids: auction.bids
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
