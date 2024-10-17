import { Button, Col, Flex } from 'antd';
import PHForm from '../../../components/PHForm/PHForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHSelect from '../../../components/PHForm/PHSelect';
import { TApiErrorResponse, TSelectOptionsType } from '../../../types';
import { monthsOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../validationSchema/semester.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManegementApi';
import { toast } from 'sonner';

const nameOptions: TSelectOptionsType = [
  { value: '01', label: 'Autumn' },
  { value: '02', label: 'Summer' },
  { value: '03', label: 'Fall' },
];

const currentYear = new Date().getFullYear();
const yearOptions: TSelectOptionsType = [0, 1, 2, 3, 4].map(num => {
  const year = (currentYear + num).toString();
  return {
    label: year,
    value: year,
  };
});

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    const name = nameOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    const toastId = toast.loading('Creating....', { id: 2 });
    try {
      const res = await addAcademicSemester(semesterData).unwrap();

      if (res?.success) toast.success(res?.message, { id: toastId });
    } catch (error) {
      const err = error as TApiErrorResponse;
      toast.error(err?.data?.message, { id: toastId });
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <PHForm
          onSubmit={handleSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect name="name" label="Name" options={nameOptions} />
          <PHSelect name="year" label="Year" options={yearOptions} />
          <PHSelect name="startMonth" label="Start Month" options={monthsOptions} />
          <PHSelect name="endMonth" label="End Month" options={monthsOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
