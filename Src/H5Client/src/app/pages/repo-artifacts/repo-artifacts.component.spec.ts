import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoArtifactsComponent } from './repo-artifacts.component';

describe('RepoArtifactsComponent', () => {
  let component: RepoArtifactsComponent;
  let fixture: ComponentFixture<RepoArtifactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoArtifactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
