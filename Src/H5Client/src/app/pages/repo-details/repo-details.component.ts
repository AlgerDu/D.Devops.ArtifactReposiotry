import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtifactRepoService, ArtifactRepo } from '../../services/artifact-repo.service';
import { SearchResult, PageModel, TableModel, TableGetDatable, Result, isSuccess } from '../../models/base';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, observable } from 'rxjs';
import { ArtifactService, ArtifactSearchModel } from '../../services/artifact.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DEventService } from 'src/app/services/event.service';
import { EventCode } from 'src/app/models/events';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.less']
})
export class RepoDetailsComponent implements TableGetDatable<ArtifactSearchModel>, OnInit {

  repo: ArtifactRepo = { code: "", name: "" };

  artifactTable: TableModel<ArtifactSearchModel>;

  constructor(
    private route: ActivatedRoute
    , private modal: NzModalService
    , private notification: NzNotificationService
    , private repoService: ArtifactRepoService
    , private artifactService: ArtifactService
    , private eventService: DEventService
  ) {
    this.artifactTable = new TableModel<ArtifactSearchModel>(this);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.repo.code = params['code'];

      this.repoService.getDetail(this.repo.code).subscribe((rst) => {
        if (isSuccess(rst)) {
          this.repo.code = rst.data?.code ?? "";

          this.artifactTable.refreash();
        } else {

        }
      })

    });
  }

  getDate(model: TableModel<ArtifactSearchModel>): Observable<SearchResult<ArtifactSearchModel>> {
    return this.artifactService.search(this.repo.code, { page: model.page, condition: model.condition });
  }

  deleteClick(): void {
    this.modal.confirm({
      nzTitle: '确定要删除仓库？',
      nzContent: '<b style="color: red;">删除之后，不可恢复</b>',
      nzOkText: '确认',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteRepo(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteRepo(): void {
    this.repoService.delete(this.repo.code).subscribe(rst => {
      if (isSuccess(rst)) {
        this.notification.success("仓库：" + this.repo.name + " 删除成功", "");
        this.eventService.publish({ code: EventCode.ArtifactRepoCountChange, data: null });
      } else {
        this.notification.error("仓库：" + this.repo.name + " 删除失败", rst.msg ?? "");
      }
    });
  }
}
