export class EditorMdConfig {

    mode: string = "gfm";
    name: string = "";
    value: string = "";
    theme: string = "";
    editorTheme: string = "eclipse";
    previewTheme: string = "";
    markdown: string = "";
    width: string = "100%";
    height: string = "640";
    path: string = "assets/editor.md/lib/";
    pluginPath: string = "";
    delay: number = 300;
    autoLoadModules: boolean = true;
    watch: boolean = true;
    placeholder: string = "";
    gotoLine: boolean = true;
    codeFold: boolean = true;
    autoHeight: boolean = false;
    autoFocus: boolean = true;
    autoCloseTags: boolean = true;
    searchReplace: boolean = true;
    syncScrolling: boolean = true;
    readOnly: boolean = false;
    tabSize: number = 4;
    indentUnit: number = 4;
    lineNumbers: boolean = true;
    lineWrapping: boolean = true;
    autoCloseBrackets: boolean = true;
    showTrailingSpace: boolean = true;
    matchBrackets: boolean = true;
    indentWithTabs: boolean = true;
    styleSelectedText: boolean = true;
    matchWordHighlight: boolean = true;
    styleActiveLine: boolean = true;
    dialogLockScreen: boolean = true;
    dialogShowMask: boolean = true;
    dialogDraggable: boolean = true;
    dialogMaskBgColor: string = "#fff";
    dialogMaskOpacity: number = 0.1;
    fontSize: string = "13px";
    saveHTMLToTextarea: boolean = true;
    previewCodeHighlight: boolean = true;
    disabledKeyMaps: any = [];
    imageUpload: boolean = false;
    imageFormats:string[] = [
        "jpg",
        "jpeg",
        "gif",
        "png",
        "bmp",
        "webp"
    ];
    imageUploadURL: string = "";
    crossDomainUpload: boolean = false;
    uploadCallbackURL: string = "";
    toc: boolean = true;
    tocm: boolean = true;
    htmlDecode: boolean = true;
    pageBreak: boolean = true;
    atLink: boolean = true;
    emailLink: boolean = true;
    taskList: boolean = false;
    emoji: boolean = false;
    flowChart: boolean = false;
    sequenceDiagram: boolean = false;
    toolbar: boolean = true;
    toolbarAutoFixed: boolean = true;
    toolbarIcons: string = "full";
    toolbarTitles: any = {};

    constructor() {
    }
}