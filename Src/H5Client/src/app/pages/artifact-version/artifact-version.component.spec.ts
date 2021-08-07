import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactVersionComponent } from './artifact-version.component';

describe('ArtifactVersionComponent', () => {
  let component: ArtifactVersionComponent;
  let fixture: ComponentFixture<ArtifactVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
