import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { BreadcrumbItem, isSuccess, SearchResult, TableGetDatable } from 'src/app/models/base';
import { ArtifactRepo, ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactSearchModel, ArtifactService, ArtifactVersionListModel } from 'src/app/services/artifact.service';
import { TableModel } from '../../models/base';

@Component({
  selector: 'app-artifact-version',
  templateUrl: './artifact-version.component.html',
  styleUrls: ['./artifact-version.component.less']
})
export class ArtifactVersionComponent implements TableGetDatable<ArtifactSearchModel>, OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  repoCode: string = "";
  artifactName: string = "";

  table: TableModel<ArtifactSearchModel>;

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService) {
    this.table = new TableModel<ArtifactSearchModel>(this);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.repoCode = params['code'];
      this.artifactName = params['artifactName'];


      this.breadcrumbItems.push({ displayName: "仓库" });
      this.breadcrumbItems.push({ displayName: this.repoCode, link: "/repo/" + this.repoCode });
      this.breadcrumbItems.push({ displayName: this.artifactName });

    });
  }

  getDate(model: TableModel<ArtifactSearchModel>): Observable<SearchResult<ArtifactSearchModel>> {
    return this.artifactService.getVersions(this.repoCode, this.artifactName, { page: model.page, condition: model.condition })
  }
}
