import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var editormd: any;

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownComponent),
      multi: true
    }
  ]
})
export class MarkdownComponent implements OnInit, ControlValueAccessor {

  id:string;
  content: string = "";

  private onChange = (_: any) => { };
  private onTouched = () => { };

  private editorConfig = {
    "mode": "gfm",
    "name": "",
    "value": "",
    "theme": "",
    "editorTheme": "eclipse",
    "previewTheme": "",
    "markdown": "",
    "appendMarkdown": "",
    "width": "100%",
    "height": "640",
    "path": "assets/editor.md/lib/",
    "pluginPath": "",
    "delay": 300,
    "autoLoadModules": true,
    "watch": true,
    "placeholder": "Enjoy Markdown! coding now...",
    "gotoLine": true,
    "codeFold": true,
    "autoHeight": false,
    "autoFocus": true,
    "autoCloseTags": true,
    "searchReplace": true,
    "syncScrolling": true,
    "readOnly": false,
    "tabSize": 4,
    "indentUnit": 4,
    "lineNumbers": true,
    "lineWrapping": true,
    "autoCloseBrackets": true,
    "showTrailingSpace": true,
    "matchBrackets": true,
    "indentWithTabs": true,
    "styleSelectedText": true,
    "matchWordHighlight": true,
    "styleActiveLine": true,
    "dialogLockScreen": true,
    "dialogShowMask": true,
    "dialogDraggable": true,
    "dialogMaskBgColor": "#fff",
    "dialogMaskOpacity": 0.1,
    "fontSize": "13px",
    "saveHTMLToTextarea": true,
    "previewCodeHighlight": true,
    "disabledKeyMaps": [],
    "imageUpload": false,
    "imageFormats": [
        "jpg",
        "jpeg",
        "gif",
        "png",
        "bmp",
        "webp"
    ],
    "imageUploadURL": "",
    "crossDomainUpload": false,
    "uploadCallbackURL": "",
    "toc": true,
    "tocm": true,
    "htmlDecode": true,
    "pageBreak": true,
    "atLink": true,
    "emailLink": true,
    "taskList": false,
    "emoji": false,
    "tex": false,
    "flowChart": false,
    "sequenceDiagram": false,
    "toolbar": true,
    "toolbarAutoFixed": true,
    "toolbarIcons": "full",
    "toolbarTitles": {}
  };
  private markdownView: any;

  constructor() {
    this.id = "xxx";
  }

  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
  }

  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
    console.log(this._name);
    this.editorConfig.markdown = name;
    this.markdownView = editormd.markdownToHTML("editormd-view",this.editorConfig);
    
  }
  private _name = '';
}
