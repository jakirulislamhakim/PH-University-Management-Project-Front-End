import { TQueryParams, TResponseRedux } from '../../../types';
import { TAcademicSemester } from '../../../types/academicSemester.type';
import { baseApi } from '../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllAcademicSemester: builder.query({
      query: (arg: TQueryParams[]) => {
        const params = new URLSearchParams();
        if (arg.length) {
          arg.forEach((item: TQueryParams) => params.append(item.name, item.value));
        }

        return {
          url: '/academic-semesters',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          semesterData: response?.data,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: body => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetAllAcademicSemesterQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
