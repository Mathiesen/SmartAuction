import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Auction} from '../models/Auction';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {TimerComponent} from '../timer/timer.component';
import {
    MatCard,
    MatCardContent,
    MatCardHeader, MatCardImage, MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Web3Service} from '../web3.service';
import {Subscription} from 'rxjs';
import {MatDivider} from "@angular/material/divider";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";

@Component({
  selector: 'app-auctionitem',
    imports: [
        DatePipe,
        TimerComponent,
        NgForOf,
        NgIf,
        MatCard,
        MatCardTitle,
        MatCardHeader,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        FormsModule,
        MatCardImage,
        MatDivider,
        MatExpansionPanel,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        MatHint,
        MatCardSubtitle,
        SlicePipe
    ],
  templateUrl: './auctionitem.component.html',
  styleUrl: './auctionitem.component.css'
})
export class AuctionitemComponent implements OnInit, OnDestroy {
  @Input() auction!: Auction;
  showBids: boolean = false;
  bidAmount: number = 0;
  private bidPlacedSubscription: Subscription = new Subscription;

  constructor(private web3: Web3Service) {
  }

  ngOnDestroy(): void {
    if (this.bidPlacedSubscription) {
      this.bidPlacedSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.bidPlacedSubscription = this.web3.bidPlacedEvent.subscribe(() => {
      window.location.reload();
    });
  }

  toggleBids(): void {
    this.showBids = !this.showBids;
  }

  async placeBid() {
    await this.web3.addBid(this.auction.auctionAddr, this.bidAmount);
  }
}
