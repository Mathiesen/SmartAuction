import { Injectable } from '@angular/core';
import { timeComponents } from './timeComponents';
@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  public calcDateDiff(endDate: Date): timeComponents {
    const dDay = endDate.valueOf();

    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;

    const timeDifference = dDay - Date.now();

    const daysToDday = Math.floor(
      timeDifference /
      (milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay)
    );

    const hoursToDday = Math.floor(
      (timeDifference /
      (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) % hoursInADay
    );

    const minutesToDday = Math.floor(
      (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
      secondsInAMinute
    );

    const secondsToDday =
      Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;

    if (daysToDday <= 0 && hoursToDday <= 0 && minutesToDday <= 0 && secondsToDday <= 0) {
      return { secondsToDday: 0, minutesToDday: 0, hoursToDday: 0, daysToDday: 0}
    } else {
      return {secondsToDday, minutesToDday, hoursToDday, daysToDday};
    }
  }
}
