import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTagComponent } from './d-tag.component';

describe('DTagComponent', () => {
  let component: DTagComponent;
  let fixture: ComponentFixture<DTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
