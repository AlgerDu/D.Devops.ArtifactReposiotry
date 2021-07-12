import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtifactList, ArtifactRepoService, ArtifactRepo } from '../../services/artifact-repo.service';
import { SearchResult, PageModel, TableModel } from '../../models/base';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.less']
})
export class RepoDetailsComponent implements OnInit {

  repo: ArtifactRepo = { code: "", name: "" };

  artifactTable: TableModel<ArtifactList>;

  constructor(
    private route: ActivatedRoute
    , private repoService: ArtifactRepoService
  ) {
    this.artifactTable = new TableModel<ArtifactList>();
    this.artifactTable.getDateFunc = this.getArtifacts;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.repo.code = params['code'];

      this.artifactTable.refreash();
    });
  }

  getArtifacts(model: TableModel<ArtifactList>): Observable<SearchResult<ArtifactList>> {
    return this.repoService.getArtifacts(this.repo, { page: model.page, condition: model.condition });
  }
}
