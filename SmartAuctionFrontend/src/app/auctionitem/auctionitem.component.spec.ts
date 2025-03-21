import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionitemComponent } from './auctionitem.component';

describe('AuctionitemComponent', () => {
  let component: AuctionitemComponent;
  let fixture: ComponentFixture<AuctionitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
