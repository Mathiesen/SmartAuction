import { TestBed } from '@angular/core/testing';

import { Web3ReadService } from './web3-read.service';

describe('Web3ReadService', () => {
  let service: Web3ReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3ReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
