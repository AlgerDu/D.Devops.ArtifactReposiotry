import { Component, Input, OnInit } from '@angular/core';
import { Tag, TagService } from '../../services/tag.service';

@Component({
  selector: 'app-d-tag',
  templateUrl: './d-tag.component.html',
  styleUrls: ['./d-tag.component.less']
})
export class DTagComponent implements OnInit {

  @Input("tag") tagName: string = "";
  tag: Tag = {
    color: "default",
    name: this.tagName,
    internal: false,
    single: false
  }

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    if (this.tagName != null) {

      this.tag.name = this.tagName;

      this.tagService.getTag(this.tagName).subscribe(
        tag => {

          if (tag == null || tag.name == null){
            return;
          }

          this.tag = tag;

          if (this.tag.color == null) {
            this.tag.color = "default";
          }
        });
    }
  }
}
