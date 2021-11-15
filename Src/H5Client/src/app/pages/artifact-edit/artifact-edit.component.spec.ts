import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactEditComponent } from './artifact-edit.component';

describe('ArtifactEditComponent', () => {
  let component: ArtifactEditComponent;
  let fixture: ComponentFixture<ArtifactEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
