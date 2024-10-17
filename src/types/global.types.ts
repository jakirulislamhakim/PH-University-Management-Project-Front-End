import { BaseQueryApi } from '@reduxjs/toolkit/query';

export type TApiErrorResponse = {
  data: {
    message: string;
    errorSources: {
      message: string;
      path: string;
    }[];
    success: boolean;
    status: number;
    stack?: string;
  };
};

export type TMeta = {
  limit: number;
  page: number;
  countTotal: number;
  totalPage: number | null;
};

export type TApiSuccessResponse<T> = {
  data: T;
  meta?: TMeta;
  success: boolean;
  status: number;
  message: string;
};

export type TResponseRedux<T> = TApiSuccessResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: string;
};
