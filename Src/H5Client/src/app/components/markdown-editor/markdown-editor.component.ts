import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var editormd: any;

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true
    }
  ]
})
export class MarkdownEditorComponent implements OnInit, ControlValueAccessor {

  content: string = ""; 
  
  private markdownEditor: any;

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

  private onChange = (_: any) => { };
  private onTouched = () => { };

  constructor(
    ) { }

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
    this.markdownEditor = editormd('markdown-editor', this.editorConfig);

    if (this.markdownEditor) {
      // 注册变更事件
      this.markdownEditor.on('change', () => {
        this.onChange(this.content);
      });
    }
  }

}
