import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateauctionComponent } from './createauction.component';

describe('CreateauctionComponent', () => {
  let component: CreateauctionComponent;
  let fixture: ComponentFixture<CreateauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateauctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
