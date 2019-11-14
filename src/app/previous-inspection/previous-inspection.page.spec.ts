import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousInspectionPage } from './previous-inspection.page';

describe('PreviousInspectionPage', () => {
  let component: PreviousInspectionPage;
  let fixture: ComponentFixture<PreviousInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
