import { Component } from '@angular/core';
import {Web3Service} from '../web3.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatHint} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";

@Component({
  selector: 'app-createauction',
  imports: [
    FormsModule,
    MatButton,
    RouterLink,
    MatInput,
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatTimepickerToggle,
    MatTimepicker,
    MatTimepickerInput
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

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private combineDateAndTime(date: Date, timeString: string): Date {
    const result = new Date(date);
    const [hours, minutes] = timeString.split(':').map(Number);

    result.setHours(hours, minutes, 0, 0);
    return result;
  }
}
