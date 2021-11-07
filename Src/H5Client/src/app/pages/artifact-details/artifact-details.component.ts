import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactModel, ArtifactSearchModel, ArtifactService } from 'src/app/services/artifact.service';

@Component({
  selector: 'app-artifact-details',
  templateUrl: './artifact-details.component.html',
  styleUrls: ['./artifact-details.component.less']
})
export class ArtifactDetailsComponent implements OnInit {

  editModalIsVisible = false;
  validateEditForm!: FormGroup;

  artifact: ArtifactModel = {
    attributes: {
      doc: "# readme",
      base: "v0.1.0"
    },
    downloadQuantity: 4,
    name: "spider",
    repoCode: "001",
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
        name: "spider_v0.1.1.080901_linux",
        downloadQuantity: 10,
        tags: ["beat", "bug"],
        attributes: {
          "size": "1024",
          "buildNum": "080901"
        }
      }
    ]
  }

  artifactForEdit?: ArtifactModel;

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private fb: FormBuilder
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService) {


    this.validateEditForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });

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

  showOrHideEditModal(): void {
    this.editModalIsVisible = !this.editModalIsVisible;
  }
}
