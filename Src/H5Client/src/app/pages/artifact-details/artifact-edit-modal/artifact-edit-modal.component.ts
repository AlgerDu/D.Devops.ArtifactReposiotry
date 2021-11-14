import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ArtifactModel, ArtifactService, ArtifactUpdateDTO } from '../../../services/artifact.service';

@Component({
  selector: 'app-artifact-edit-modal',
  templateUrl: './artifact-edit-modal.component.html',
  styleUrls: ['./artifact-edit-modal.component.less']
})
export class ArtifactEditModalComponent implements OnInit {

  artifact!: ArtifactModel;

  data!: ArtifactUpdateDTO;
  validateForm!: FormGroup;

  isConfriming: boolean = false;

  constructor(
    private modal: NzModalRef
    , private notification: NzNotificationService
    , private fb: FormBuilder
    , private artifactService: ArtifactService
  ) { }

  @Input()
  set model(artifact: ArtifactModel) {
    this.artifact = artifact;
    this.data = {
      "attributes": JSON.parse(JSON.stringify(artifact.attributes)),
      "depends": JSON.parse(JSON.stringify(artifact.depends)),
      "tags": JSON.parse(JSON.stringify(artifact.tags))
    }
  }

  ngOnInit(): void {

  }

  confrime() {

  }

  destroyModal() {

  }

}
