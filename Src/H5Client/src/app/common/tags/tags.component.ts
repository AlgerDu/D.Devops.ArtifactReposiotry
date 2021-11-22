import { Component, OnInit, Input, ElementRef, ViewChild, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { isSuccess } from '../../models/base';
import { Tag } from '../../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.less']
})
export class TagsComponent implements OnInit, OnChanges {

  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();
  @Input("editable") editable: boolean = false;

  inputVisible = false;
  inputValue = '';

  datas: Tag[] = [];

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  constructor(
    private tagService: TagService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.datas = [];
    this.tags.forEach(tagName => {
      this.getTagAndCache(tagName);
    });
  }

  ngOnInit(): void {
  }

  handleClose(removedTag: string): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    this.datas = this.datas.filter(tag => tag.name == removedTag);
    this.tagsChange.emit(this.tags);
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
      this.getTagAndCache(this.inputValue);
      this.tagsChange.emit(this.tags);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  getTagAndCache(tagName: string) {
    this.tagService.getTag(tagName)
      .subscribe((data) => {
        this.datas.push(data);
      });
  }
}
