import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactEditModalComponent } from './artifact-edit-modal.component';

describe('ArtifactEditModalComponent', () => {
  let component: ArtifactEditModalComponent;
  let fixture: ComponentFixture<ArtifactEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
