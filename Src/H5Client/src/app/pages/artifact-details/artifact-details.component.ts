import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { isSuccess, SearchResult, TableGetDatable } from 'src/app/models/base';
import { ArtifactRepo, ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { ArtifactListModel, ArtifactService, ArtifactVersionListModel } from 'src/app/services/artifact.service';
import { TableModel } from '../../models/base';

@Component({
  selector: 'app-artifact-details',
  templateUrl: './artifact-details.component.html',
  styleUrls: ['./artifact-details.component.less']
})
export class ArtifactDetailsComponent implements TableGetDatable<ArtifactVersionListModel>,OnInit {

  repo: ArtifactRepo = { code: "", name: "name" };
  artifact:ArtifactListModel = {name:"",lastVersion:"",lastUpdateTime:new Date()};

  table:TableModel<ArtifactVersionListModel>;

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService) { 
      this.table = new TableModel<ArtifactVersionListModel>(this);
    }

  getDate(model: TableModel<ArtifactVersionListModel>): Observable<SearchResult<ArtifactVersionListModel>> {
    return this.artifactService.getVersions(this.repo.code,this.artifact.name, { page: model.page, condition: model.condition })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.repo.code = params['code'];
      this.artifact.name = params['artifactName'];

      this.repoService.getDetail(this.repo.code).subscribe((rst) => {
        if (isSuccess(rst)) {
          this.repo.name = rst.data?.name ?? "";
        }
      })

    });
  }
  
  deleteClick(): void {
    this.modal.confirm({
      nzTitle: '确定要删除仓库？',
      nzContent: '<b style="color: red;">删除之后，不可恢复</b>',
      nzOkText: '确认',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => "",
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
