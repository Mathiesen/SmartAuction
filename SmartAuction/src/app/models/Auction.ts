import {Bid} from './Bid';

export interface Auction {
  auctionAddr: string;
  bids: Bid[];
  name: string;
  description: string;
  condition: string;
  startDate: Date;
  endDate: Date;
}
