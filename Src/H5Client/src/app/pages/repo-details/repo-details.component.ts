import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtifactList, ArtifactRepoService, ArtifactRepo } from '../../services/artifact-repo.service';
import { SearchResult, PageModel } from '../../models/base';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.less']
})
export class RepoDetailsComponent implements OnInit {

  repo: ArtifactRepo = { code: "", name: "" };

  artifacts: ArtifactList[] = [];
  page: PageModel = {
    index: 1,
    size: 20
  };
  condition: string = "";
  totalCount: number = 0;

  tableIsLoading:boolean = false;

  constructor(
    private route: ActivatedRoute
    , private repoService: ArtifactRepoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.repo.code = params['code'];

      this.refreash();
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    
    this.page.index = params.pageIndex;
    this.page.size = params.pageSize;

    this.refreashTable();
  }

  refreash() {
    this.repo.name = this.repo.code;

    this.page = {
      index: 1,
      size: 20
    };
    this.condition = "";
    this.artifacts = [];
    this.totalCount = 0;
  }

  refreashTable() {
    this.tableIsLoading = true;

    this.repoService.getArtifacts(this.repo, { page: this.page, condition: this.condition })
      .subscribe((rst) => {
        this.tableIsLoading = false;

        if (rst.code != 0) {
          return;
        }

        this.page = rst.page;
        this.artifacts = rst.datas;
        this.totalCount = rst.totalCount;
      })
  }
}
