import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem, SearchResult, TableGetDatable, TableModel } from 'src/app/models/base';
import { ArtifactSearchModel, ArtifactService } from 'src/app/services/artifact.service';
import { ActivatedRoute } from '_@angular_router@11.0.9@@angular/router';
import { Observable } from '_rxjs@6.6.7@rxjs';

@Component({
  selector: 'app-repo-artifacts',
  templateUrl: './repo-artifacts.component.html',
  styleUrls: ['./repo-artifacts.component.less']
})
export class RepoArtifactsComponent implements TableGetDatable<ArtifactSearchModel>, OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  repoCode: string = "";

  talbe: TableModel<ArtifactSearchModel>;

  constructor(
    private route: ActivatedRoute
    , private artifactService: ArtifactService
  ) {
    this.talbe = new TableModel<ArtifactSearchModel>(this);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      this.repoCode = params.get('code') ?? "";

      this.breadcrumbItems.push({ displayName: "仓库" });
      this.breadcrumbItems.push({ displayName: params.get('code') ?? "" });

    });

  }

  getDate(model: TableModel<ArtifactSearchModel>): Observable<SearchResult<ArtifactSearchModel>> {
    return this.artifactService.search(this.repoCode, { page: model.page, condition: model.condition });
  }

}
