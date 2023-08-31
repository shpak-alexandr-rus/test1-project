export interface IResponse<R> {
  code: number;
  data: null | R | R[];
  message?: null | string;
}

export interface IPagination<R> {
  page: number;
  totalPages: number;
  data: null | R | R[];
}

export interface IStatus {
  status: boolean;
}
