import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionlistComponent } from './auctionlist.component';

describe('AuctionlistComponent', () => {
  let component: AuctionlistComponent;
  let fixture: ComponentFixture<AuctionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
