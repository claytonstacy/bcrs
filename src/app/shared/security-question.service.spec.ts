import { TestBed } from '@angular/core/testing';

import { SecurityQuestionService } from './security-question.service';

describe('SecurityQuestionService', () => {
  let service: SecurityQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
