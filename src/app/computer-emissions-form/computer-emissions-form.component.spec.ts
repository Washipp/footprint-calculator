import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerEmissionsFormComponent } from './computer-emissions-form.component';

describe('ComputerEmissionsFormComponent', () => {
  let component: ComputerEmissionsFormComponent;
  let fixture: ComponentFixture<ComputerEmissionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerEmissionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerEmissionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
