import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSummarizerComponent } from './add-summarizer.component';

describe('AddSummarizerComponent', () => {
  let component: AddSummarizerComponent;
  let fixture: ComponentFixture<AddSummarizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSummarizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSummarizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
