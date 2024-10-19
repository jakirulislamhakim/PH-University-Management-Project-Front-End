import AcademicDepartment from '../pages/admin/academicSemester/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academicSemester/AcademicFaculty';
import AcademicSemester from '../pages/admin/academicSemester/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academicSemester/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academicSemester/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academicSemester/CreateAcademicSemester';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/userManegement/CreateAdmin';
import CreateFaculty from '../pages/admin/userManegement/CreateFaculty';
import CreateStudent from '../pages/admin/userManegement/CreateStudent';
import ShowAllStudents from '../pages/admin/userManegement/ShowAllStudents';
import UpdateStudent from '../pages/admin/userManegement/UpdateStudent';

export const adminPath = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'Academic Management',
    children: [
      {
        name: 'Create A. Semester',
        path: 'create-academic-semester',
        element: <CreateAcademicSemester />,
      },

      {
        name: 'Academic Semester',
        path: 'academic-semester',
        element: <AcademicSemester />,
      },
      {
        name: 'Create A. Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty />,
      },
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />,
      },
      {
        name: 'Create A. Department',
        path: 'create-academic-department',
        element: <CreateAcademicDepartment />,
      },
      {
        name: 'Academic Department',
        path: 'academic-department',
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        name: 'Students',
        path: 'students',
        element: <ShowAllStudents />,
      },
      {
        path: 'student-update/:studentId',
        element: <UpdateStudent />,
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />,
      },
    ],
  },
];
