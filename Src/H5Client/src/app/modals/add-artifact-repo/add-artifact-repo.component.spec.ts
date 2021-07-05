import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtifactRepoComponent } from './add-artifact-repo.component';

describe('AddArtifactRepoComponent', () => {
  let component: AddArtifactRepoComponent;
  let fixture: ComponentFixture<AddArtifactRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArtifactRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtifactRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
