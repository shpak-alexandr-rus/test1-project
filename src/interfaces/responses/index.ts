export interface IResponse<R> {
  code: number;
  data: null | R | R[];
  message?: null | string;
}
