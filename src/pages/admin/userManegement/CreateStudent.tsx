import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/PHForm/PHForm';
import PHInput from '../../../components/PHForm/PHInput';
import { Button, Col, Divider, Row } from 'antd';
import PHSelect from '../../../components/PHForm/PHSelect';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import PHDatePicker from '../../../components/PHForm/PHDatePicker';
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from '../../../redux/features/admin/academicManegementApi';
import { TApiErrorResponse, TSelectOptionsType } from '../../../types';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagementApi';
import PHFileUPload from '../../../components/PHForm/PHFileUpload';
import { toast } from 'sonner';

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  const { data: semesterData, isLoading: isSemesterLoading } =
    useGetAllAcademicSemesterQuery([{ name: 'sort', value: 'year' }], {});

  const { data: departmentData, isLoading: isDepartmentLoading } =
    useGetAllAcademicDepartmentQuery(undefined, {
      // skip: isSemesterLoading,
    });

  const semesterOptions: TSelectOptionsType = semesterData?.semesterData?.map(
    (semester) => ({
      value: semester._id,
      label: `${semester.name} ${semester.year}`,
    })
  );

  const departmentOptions: TSelectOptionsType = departmentData?.departmentData?.map(
    (department) => ({
      value: department._id,
      label: `${department.name}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Student creating....', { id: 11 });
    const student = {
      password: 'student123',
      student: data,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(student));
    formData.append('file', data?.profileImg);

    try {
      const res = await addStudent(formData).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      const err = error as TApiErrorResponse;
      toast.error(err?.data?.message, { id: toastId });
    }

    //! this is only development mode for show form data
    // console.log([...formData.entries()]);
    // console.log(Object.fromEntries(formData)); //*best way to show from data
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info.</Divider>
          <Row gutter={20}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.firstName" label="First Name" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.middleName" label="Middle Name" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.lastName" label="Last Name" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFileUPload name="profileImg" label="Profile Image" />
            </Col>
          </Row>
          <Divider>Contact info.</Divider>
          <Row gutter={20}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="email" label="Email " type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="contactNo" label="Contact No." type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="emergencyContactNo"
                label="Emergency Contact No."
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="presentAddress" label="Present Address" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="permanentAddres"
                label="permanent Address"
                type="text"
              />
            </Col>
          </Row>
          <Divider>Guardian info.</Divider>
          <Row gutter={20}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherName"
                label="Father's Name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherOccupation"
                label="Father Occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherContactNo"
                label="Father Contact No."
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherName"
                label="Mother's Name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherOccupation"
                label="Mother Occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherContactNo"
                label="motherContactNo"
                type="text"
              />
            </Col>
          </Row>
          <Divider>Local Guardian info.</Divider>
          <Row gutter={20}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="localGuardian.name" label="Name" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.occupation"
                label="Occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.contactNo"
                label="Contact No."
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="localGuardian.address" label="Address" type="text" />
            </Col>
          </Row>
          <Divider>Academic info.</Divider>
          <Row gutter={20}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                label="Admission Semester"
                disabled={isSemesterLoading}
                options={semesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                disabled={isDepartmentLoading}
                options={departmentOptions}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
