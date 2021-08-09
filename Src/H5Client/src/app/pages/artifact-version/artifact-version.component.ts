import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactSearchModel, ArtifactService } from 'src/app/services/artifact.service';

@Component({
  selector: 'app-artifact-version',
  templateUrl: './artifact-version.component.html',
  styleUrls: ['./artifact-version.component.less']
})
export class ArtifactVersionComponent implements OnInit {

  text:string="#sdfsdfdf";

  artifact: ArtifactSearchModel = {
    attributes: {},
    downloadQuantity: 0,
    name: "",
    repoCode: "",
    tags: [],
    version: ""
  }

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.artifact.repoCode = params['code'];
      this.artifact.name = params['artifactName'];
      this.artifact.version = params['version'];

      this.artifact.tags = ["beat","lite"];
    });
  }

  deleteClick(){

  }
}
