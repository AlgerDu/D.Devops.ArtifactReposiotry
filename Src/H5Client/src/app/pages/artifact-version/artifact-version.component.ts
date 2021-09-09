import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactModel, ArtifactSearchModel, ArtifactService } from 'src/app/services/artifact.service';

@Component({
  selector: 'app-artifact-version',
  templateUrl: './artifact-version.component.html',
  styleUrls: ['./artifact-version.component.less']
})
export class ArtifactVersionComponent implements OnInit {

  artifact: ArtifactModel = {
    attributes: {
      doc: "# readme"
    },
    downloadQuantity: 4,
    name: "spider",
    repoCode: "",
    tags: [],
    version: "v0.1.1",
    depends: [{
      condition: "runtime",
      artifacts: [{
        name: "asp.net core runtime",
        version: "net5.0"
      }]
    }, {
      condition: "base",
      artifacts: [{
        name: "spider.core",
        version: "v0.1.0"
      }, {
        name: "spider.ui",
        version: "v0.1.1"
      }]
    }],
    obejcts: [
      {
        name: "spider_v0.1.1_linux",
        downloadQuantity: 10,
        tags: ["beat","bug"],
        attributes: {
          "size": "1024"
        }
      }
    ]
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

      this.artifact.tags = ["beat", "lite"];
    });
  }

  deleteClick() {

  }

  modelChange(e: any): void {
    console.log(e);

  }
}
