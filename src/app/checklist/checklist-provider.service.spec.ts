import { TestBed } from '@angular/core/testing';

import { ChecklistProviderService } from './checklist-provider.service';

describe('ChecklistProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistProviderService = TestBed.get(ChecklistProviderService);
    expect(service).toBeTruthy();
  });
});
