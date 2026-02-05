import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorModal } from './sponsor-modal';

describe('SponsorModal', () => {
  let component: SponsorModal;
  let fixture: ComponentFixture<SponsorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
