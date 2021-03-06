import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddArtifactRepoComponent } from './modals/add-artifact-repo/add-artifact-repo.component';
import { ArtifactRepo, ArtifactRepoService } from './services/artifact-repo.service';
import { DEvent, DEventService } from './services/event.service';
import { EventCode } from './models/events';

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
    , private eventService: DEventService
    , private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.eventService.subscribe(EventCode.ArtifactRepoCountChange).subscribe((device)=>{
      this.refreash();
    });

    this.refreash();
  }

  showAddArtifactRepoModal(): void {
    this.modalService.create({
      nzTitle: '创建新的仓库',
      nzContent: AddArtifactRepoComponent
    });
  }

  handleRepoChange(devent: DEvent): void {
    this.refreash();
  }

  refreash(): void {
    this.artifactRepoService.getAll().subscribe(repos => {
      this.artifactRepos = repos;
    });
  }
}
