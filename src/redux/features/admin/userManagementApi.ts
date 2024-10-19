import { TQueryParams, TResponseRedux, TStudent } from '../../../types';
import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAStudents: builder.query({
      query: (arg: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (arg?.length) {
          arg.forEach((item: TQueryParams) => params.append(item.name, item.value));
        }

        return {
          url: '/students',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          studentData: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getSingleAStudents: builder.query({
      query: (studentId) => {
        return {
          url: `/students/${studentId}`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          studentData: response?.data,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (body) => ({
        url: '/users/create-student',
        method: 'POST',
        body,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ studentId, updatedData }) => {
        return {
          url: `/students/${studentId}`,
          method: 'PATCH',
          body: updatedData,
        };
      },
    }),
  }),
});

export const {
  useGetAllAStudentsQuery,
  useAddStudentMutation,
  useGetSingleAStudentsQuery,
  useUpdateStudentMutation,
} = userManagementApi;
