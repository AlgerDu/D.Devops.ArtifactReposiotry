import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { BreadcrumbItem, isSuccess, SearchResult, TableGetDatable } from 'src/app/models/base';
import { ArtifactRepo, ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactListModel, ArtifactSearchModel, ArtifactService } from 'src/app/services/artifact.service';
import { TableModel } from '../../models/base';

@Component({
  selector: 'app-artifact-version',
  templateUrl: './artifact-version.component.html',
  styleUrls: ['./artifact-version.component.less']
})
export class ArtifactVersionComponent implements TableGetDatable<ArtifactListModel>, OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  repoCode: string = "";
  artifactName: string = "";

  table: TableModel<ArtifactListModel>;

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService
  ) {
    this.table = new TableModel<ArtifactListModel>(this);
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

  getDate(model: TableModel<ArtifactListModel>): Observable<SearchResult<ArtifactListModel>> {
    return this.artifactService.getVersions(this.repoCode, this.artifactName, { page: model.page, condition: model.condition })
  }
}
