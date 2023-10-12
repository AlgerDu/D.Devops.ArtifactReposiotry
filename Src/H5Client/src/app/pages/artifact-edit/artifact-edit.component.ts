import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BreadcrumbItem, isSuccess } from 'src/app/models/base';
import { ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactModel, ArtifactService, ArtifactSymbol, ArtifactUpdateDTO } from 'src/app/services/artifact.service';

@Component({
  selector: 'app-artifact-edit',
  templateUrl: './artifact-edit.component.html',
  styleUrls: ['./artifact-edit.component.less']
})
export class ArtifactEditComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  validateForm!: FormGroup;

  artifact: ArtifactSymbol;
  data: ArtifactUpdateDTO = {
    "tags": [],
    "attributes": {},
    "depends": []
  };

  isGetingData = true;

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private fb: FormBuilder
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService
  ) {
    this.artifact = {
      "version": "unknown",
      "name": "unknown",
      "repoCode": "unknown"
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.artifact.repoCode = params['code'];
      this.artifact.name = params['artifactName'];
      this.artifact.version = params['version'];

      this.breadcrumbItems.push({ displayName: "仓库" });
      this.breadcrumbItems.push({ displayName: this.artifact.repoCode, link: "/repo/" + this.artifact.repoCode });
      this.breadcrumbItems.push({ displayName: this.artifact.name, link: "/repo/" + this.artifact.repoCode + "/artifacts/" + this.artifact.name });
      this.breadcrumbItems.push({ displayName: "v" + this.artifact.version, link: `/repo/${this.artifact.repoCode}/artifacts/${this.artifact.name}/v/${this.artifact.version}` });
      this.breadcrumbItems.push({ displayName: "编辑" });

      this.artifactService.getDetail(this.artifact.repoCode, this.artifact.name, this.artifact.version).subscribe((rst) => {

        if (isSuccess(rst) && rst.data != null) {
          this.data = {
            "attributes": JSON.parse(JSON.stringify(rst.data.attributes)),
            "depends": JSON.parse(JSON.stringify(rst.data.depends)),
            "tags": JSON.parse(JSON.stringify(rst.data.tags))
          }
        }
      });
    });
  }

}
