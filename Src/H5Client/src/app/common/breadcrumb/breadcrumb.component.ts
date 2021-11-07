import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbItem } from 'src/app/models/base';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {

  @Input("items") items: BreadcrumbItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
