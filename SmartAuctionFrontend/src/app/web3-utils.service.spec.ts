import { TestBed } from '@angular/core/testing';

import { Web3UtilsService } from './web3-utils.service';

describe('Web3UtilsService', () => {
  let service: Web3UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
