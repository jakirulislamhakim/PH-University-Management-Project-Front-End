import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllAcademicSemester: builder.query({
    //   query: (arg: TQueryParams[]) => {
    //     const params = new URLSearchParams();
    //     if (arg.length) {
    //       arg.forEach((item: TQueryParams) => params.append(item.name, item.value));
    //     }

    //     return {
    //       url: '/academic-semesters',
    //       method: 'GET',
    //       params,
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
    //     return {
    //       semesterData: response?.data,
    //     };
    //   },
    // }),
    addStudent: builder.mutation({
      query: (body) => ({
        url: '/users/create-student',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
