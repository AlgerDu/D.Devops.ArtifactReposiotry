import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ArtifactRepoService } from 'src/app/services/artifact-repo.service';

@Component({
  selector: 'app-add-artifact-repo',
  templateUrl: './add-artifact-repo.component.html',
  styleUrls: ['./add-artifact-repo.component.less']
})
export class AddArtifactRepoComponent implements OnInit {

  validateForm!: FormGroup;

  isConfriming : boolean = false;

  constructor(
    private modal: NzModalRef
    , private notification: NzNotificationService
    , private fb: FormBuilder
    , private artifactRepoService: ArtifactRepoService 
    ) {}

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]]
    });

  }




  destroyModal(): void {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid){
      return;
    }

    this.isConfriming = true;

    this.notification.error("新建仓库","出现异常未能成功");

    this.isConfriming = false;
  }

}
