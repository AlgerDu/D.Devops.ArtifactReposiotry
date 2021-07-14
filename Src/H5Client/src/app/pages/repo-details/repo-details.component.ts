import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtifactList, ArtifactRepoService, ArtifactRepo } from '../../services/artifact-repo.service';
import { SearchResult, PageModel, TableModel, TableGetDatable } from '../../models/base';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.less']
})
export class RepoDetailsComponent implements TableGetDatable<ArtifactList>, OnInit {

  repo: ArtifactRepo = { code: "", name: "" };

  artifactTable: TableModel<ArtifactList>;

  constructor(
    private route: ActivatedRoute
    , private repoService: ArtifactRepoService
  ) {
    this.artifactTable = new TableModel<ArtifactList>(this);
  }
  
  getDate(model: TableModel<ArtifactList>): Observable<SearchResult<ArtifactList>> {
    return this.repoService.getArtifacts(this.repo, { page: model.page, condition: model.condition });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.repo.code = params['code'];

      this.artifactTable.refreash();
    });
  }
}
