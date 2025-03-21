import { Component } from '@angular/core';
import {Web3Service} from '../web3.service';
import {FormsModule} from '@angular/forms';
import {timestamp} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createauction',
  imports: [
    FormsModule
  ],
  templateUrl: './createauction.component.html',
  styleUrl: './createauction.component.css'
})
export class CreateauctionComponent {
  auction = {
    name: '',
    description: '',
    condition: '',
    start: new Date(),
    end: new Date(),
    estimate: ''
  };

  constructor(private web3: Web3Service, private router: Router) {

  }

  async createAuction() {
    await this.web3.createAuction(this.auction).then(() => {
      this.router.navigate(['/']);
    });
  }
}
