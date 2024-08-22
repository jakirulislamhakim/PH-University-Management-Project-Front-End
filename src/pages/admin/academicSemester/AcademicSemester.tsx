import { useGetAllAcademicSemesterQuery } from '../../../redux/features/academicSemster/academicSemesterApi';

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);

  console.log(data);

  return (
    <div>
      <h2> AcademicSemester Component </h2>
    </div>
  );
};

export default AcademicSemester;
