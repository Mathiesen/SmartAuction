import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Web3Service} from './web3.service';
import web3 from 'web3';
import {FormsModule} from '@angular/forms';
import {CountdownService} from './countdown.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = '';
  bidAmount: number = 0;
  auctions: any[] = []

  constructor(private router: Router) {

  }

  createAuction() {
    this.router.navigate(['/', 'createAuction']);
  }
}
