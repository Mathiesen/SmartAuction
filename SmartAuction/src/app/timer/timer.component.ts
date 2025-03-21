import {Component, Input, OnInit} from '@angular/core';
import {timeComponents} from '../timeComponents';
import {distinctUntilChanged, interval, map, Observable, shareReplay, Subscription} from 'rxjs';
import {CountdownService} from '../countdown.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {Web3Service} from '../web3.service';

@Component({
  selector: 'app-timer',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {

  @Input() doneDate!: Date;
  @Input() itemAddr!: string;
  public timeLeft$!: Observable<timeComponents>;
  private subscription!: Subscription;

  constructor(private countdownService: CountdownService, private web3Service: Web3Service) {
  }

  ngOnInit() {
    this.timeLeft$ = interval(1000).pipe(
      map(() => this.countdownService.calcDateDiff(this.doneDate)),
      distinctUntilChanged((prev, curr) => prev.secondsToDday === curr.secondsToDday)
    );
    this.subscription = this.timeLeft$.subscribe(time => {
      if (time.daysToDday <= 0 && time.hoursToDday <= 0
        && time.minutesToDday <= 0 && time.secondsToDday <= 0) {
        this.web3Service.finalizeAuction(this.itemAddr)
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
        this.subscription.unsubscribe();
      }
    });
  }


}
