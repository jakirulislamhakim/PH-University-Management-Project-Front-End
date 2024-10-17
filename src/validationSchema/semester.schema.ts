import { z } from 'zod';

export const academicSemesterSchema = z.object({
  name: z.string({
    required_error: 'Please select name',
  }),
  year: z.string({
    required_error: 'Please select year',
  }),
  startMonth: z.string({
    required_error: 'Please select start month',
  }),
  endMonth: z.string({
    required_error: 'Please select end month',
  }),
});
