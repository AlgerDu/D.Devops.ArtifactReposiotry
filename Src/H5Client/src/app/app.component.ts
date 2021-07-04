import { Component, OnInit } from '@angular/core';
import { ArtifactRepo, ArtifactRepoService } from './services/artifact-repo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  artifactRepos: ArtifactRepo[] = [];

  constructor(
    private artifactRepoService: ArtifactRepoService
  ){}

  ngOnInit() {
    this.artifactRepoService.get().subscribe(repos=>{
      this.artifactRepos = repos;
    });
  }
}
