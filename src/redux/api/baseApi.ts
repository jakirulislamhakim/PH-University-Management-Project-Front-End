import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logoutUser, setUser, TUser } from '../features/auth/authSlice';
import { toast } from 'sonner';
import { TApiErrorResponse } from '../../types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});

const baseApiWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (arg, api, extraOptions): Promise<any> => {
  try {
    let result = await baseQuery(arg, api, extraOptions);

    if (result.error?.status === 404) {
      const errorData = result.error as TApiErrorResponse;
      return toast.error(errorData.data.message);
    }

    if (result.error?.status === 401) {
      console.log('sending refresh token...');
      const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });
      const { data } = await res.json();

      if (data?.accessToken) {
        const user = (api.getState() as RootState).auth.user as TUser;

        api.dispatch(
          setUser({
            user,
            token: data.accessToken,
          })
        );

        result = await baseQuery(arg, api, extraOptions);
      } else {
        api.dispatch(logoutUser());
      }
    }

    return result;
  } catch (error) {
    return error;
  }
};

// root api
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseApiWithRefreshToken,
  endpoints: () => ({}),
});
