export interface Result {
    code: number;
    msg?: string;
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