import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-artifact-repo',
  templateUrl: './add-artifact-repo.component.html',
  styleUrls: ['./add-artifact-repo.component.less']
})
export class AddArtifactRepoComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private modal: NzModalRef
    ,private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [ Validators.required]]
    });
  }


  destroyModal(): void {
    this.modal.destroy();
  }

}
