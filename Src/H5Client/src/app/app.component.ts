import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddArtifactRepoComponent } from './modals/add-artifact-repo/add-artifact-repo.component';
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
    ,private modalService: NzModalService
  ){}

  ngOnInit() {
    this.artifactRepoService.get().subscribe(repos=>{
      this.artifactRepos = repos;
    });
  }

  showAddArtifactRepoModal(): void {
    this.modalService.create({
      nzTitle: '创建新的仓库',
      nzContent: AddArtifactRepoComponent
    });
  }
}
