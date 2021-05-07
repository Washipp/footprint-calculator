import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomFormComponent } from './zoom-form.component';

describe('ZoomFormComponent', () => {
  let component: ZoomFormComponent;
  let fixture: ComponentFixture<ZoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
