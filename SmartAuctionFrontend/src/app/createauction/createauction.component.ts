import { Component } from '@angular/core';
import {Web3Service} from '../web3.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatSelect} from "@angular/material/select";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-createauction',
  imports: [
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatSuffix,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatOption,
    MatSelect,
    MatTimepickerInput,
    MatTimepicker,
    MatTimepickerToggle,
    MatButton,
    RouterLink,
    MatHint,
    MatLabel,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './createauction.component.html',
  styleUrl: './createauction.component.css'
})
export class CreateauctionComponent {
  auction = {
    name: '',
    description: '',
    condition: '',
    estimate: '',
    start: new Date(),
    end: new Date()
  };

  // Use single Date objects for both date and time
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();

  constructor(private web3: Web3Service, private router: Router) {

  }

  async createAuction() {
    this.auction.start = this.startDateTime;
    this.auction.end = this.endDateTime;

    await this.web3.createAuction(this.auction).then(() => {
      this.router.navigate(['/']);
    });
  }
}
