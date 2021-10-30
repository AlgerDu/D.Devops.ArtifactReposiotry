import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Observable, observable } from 'rxjs';

export interface Result {
    code: number;
    msg?: string;
}

export interface Result {
    isSuccess(): boolean;
}

export function isSuccess(rst: Result) {
    return rst.code != 1;
}

export interface DataResult<DataType> extends Result {
    data?: DataType;
}

export interface PageModel {
    size: number;
    index: number;
}

export interface Search {
    page: PageModel;
    condition: string;
}

export interface SearchResult<DataType> extends Result {
    datas: DataType[];
    totalCount: number;
    page: PageModel;
}

export interface TableGetDatable<DataType> {
    getDate(model: TableModel<DataType>): Observable<SearchResult<DataType>>;
}

export class TableModel<DataType> {
    page: PageModel;
    total: number;

    condition: string;

    datas: DataType[];

    isLoading: boolean;

    getter?: TableGetDatable<DataType>;

    constructor(getter: TableGetDatable<DataType>) {
        this.page = {
            index: 1,
            size: 20
        };
        this.condition = "";
        this.total = 0;
        this.datas = [];
        this.isLoading = false;

        this.getter = getter;
    }

    onQueryParamsChange(params: NzTableQueryParams): void {

        console.log(params);
        const { pageSize, pageIndex, sort, filter } = params;

        this.page.index = params.pageIndex;
        this.page.size = params.pageSize;

        this.refreash();
    }

    refreash(): void {

        if (this.getter == null) {
            return;
        }

        this.isLoading = true;

        this.getter.getDate(this).subscribe((rst) => {
            this.total = rst.totalCount;
            this.page = rst.page;

            if (rst.datas != null) {
                this.datas = rst.datas;
            } else {
                this.datas = [];
            }
        }, (err) => {

        }, () => {
            this.isLoading = false;
        });
    }
}

/**
 *  面包屑导航 item 的模型，用来绑定，后续可以抽象为一个组件
 */
export interface BreadcrumbItem {
    displayName: string;
    link?: string;
}