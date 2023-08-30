export interface IResponse<R> {
  code: number;
  data: null | R | R[];
  message?: null | string;
}

export interface IStatus {
  status: boolean;
}
