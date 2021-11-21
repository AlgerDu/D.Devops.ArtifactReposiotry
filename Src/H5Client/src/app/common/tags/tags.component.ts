import { Component, OnInit, Input, ElementRef, ViewChild, Output } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { isSuccess } from '../../models/base';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.less']
})
export class TagsComponent implements OnInit {

  @Input("data") tags: string[] = [];
  @Input("editable") editable: boolean = false;

  inputVisible = false;
  inputValue = '';

  tagColors: Map<string, string> = new Map<string, string>();

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.tags.forEach(tag => {
      this.getTagColorAndCache(tag);
    })
  }

  handleClose(removedTag: string): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    this.tagColors.delete(removedTag);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
      this.getTagColorAndCache(this.inputValue);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  getTagColorAndCache(tag: string) {

    if (this.tagColors.has(tag)) {
      return;
    }

    this.tagService.getTag(tag).subscribe((data) => {
      this.tagColors.set(tag, data.color)
    });
  }

}
