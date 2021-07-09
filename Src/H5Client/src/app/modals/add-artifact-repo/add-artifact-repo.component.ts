import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ArtifactRepoService } from 'src/app/services/artifact-repo.service';
import { DEventService } from 'src/app/services/event.service';
import { ArtifactRepo } from '../../services/artifact-repo.service';
import { EventCode } from '../../models/events';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-add-artifact-repo',
  templateUrl: './add-artifact-repo.component.html',
  styleUrls: ['./add-artifact-repo.component.less']
})
export class AddArtifactRepoComponent implements OnInit {

  item: ArtifactRepo;
  validateForm!: FormGroup;

  isConfriming: boolean = false;

  constructor(
    private modal: NzModalRef
    , private notification: NzNotificationService
    , private fb: FormBuilder
    , private artifactRepoService: ArtifactRepoService
    , private eventService: DEventService
  ) {
    this.item = { code: "", name: "" }
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });

  }




  confrime(): void {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    }

    this.isConfriming = true;

    this.artifactRepoService.add(this.item).subscribe((d) => {

      this.eventService.publish({ code: EventCode.ArtifactRepoCountChange, data: null });

      this.notification.info("仓库添加成功", "名称：" + this.item.name);

      this.destroyModal();

    }, (err) => {
      console.log("eee");

    }, () => {
      this.isConfriming = false;
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
