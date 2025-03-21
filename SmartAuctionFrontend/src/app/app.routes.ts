import { Routes } from '@angular/router';
import {CreateauctionComponent} from './createauction/createauction.component';
import {AuctionlistComponent} from './auctionlist/auctionlist.component';

export const routes: Routes = [
  { path: '', component: AuctionlistComponent },
  { path: 'createAuction', component: CreateauctionComponent },
];

