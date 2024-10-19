import { Button, Pagination, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';
import { TQueryParams, TStudent } from '../../../types';
import { useGetAllAStudentsQuery } from '../../../redux/features/admin/userManagementApi';
import { Link } from 'react-router-dom';

type TTableData = { key: string } & Pick<
  TStudent,
  'fullName' | 'id' | 'email' | 'contactNo'
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: 'Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Roll No.',
    dataIndex: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Contact No.',
    dataIndex: 'contactNo',
  },
  {
    title: 'Action',
    render: (currentStudent) => {
      return (
        <Space>
          <Button type="primary">Details</Button>
          <Link to={`/admin/student-update/${currentStudent?.key}`}>
            <Button type="primary">Update</Button>
          </Link>
          <Button type="primary">Block</Button>
        </Space>
      );
    },
    width: '1%',
  },
];

const ShowAllStudents = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const {
    data: studentsData,
    isLoading,
    isFetching,
  } = useGetAllAStudentsQuery([
    ...params,
    { name: 'sort', value: 'id' },
    // { name: 'limit', value: '3' }, // for testing purpose .can control page limit inside component
    { name: 'page', value: page?.toString() },
  ]);

  const meta = studentsData?.meta;

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryParams[] = [];
    if (extra.action === 'filter') {
      filters?.name?.forEach((name) =>
        queryParams.push({ name: 'name', value: name as string })
      );
    }
    if (extra.action === 'filter') {
      filters?.year?.forEach((name) =>
        queryParams.push({ name: 'year', value: name as string })
      );
    }
    setParams(queryParams);
  };

  // if (isLoading) {
  //   return <p>Loading....</p>;
  // }
  // if (!semesterData?.semesterData.length) {
  //   return <p>NO semester available!</p>;
  // }

  const data: TTableData[] | undefined = studentsData?.studentData.map(
    ({ fullName, id, email, contactNo, _id }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  return (
    <>
      <Table<TTableData>
        columns={columns}
        dataSource={data}
        loading={isLoading || isFetching}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
      <Pagination
        align="center"
        onChange={(page) => setPage(page)}
        current={page}
        pageSize={meta?.limit}
        defaultCurrent={1}
        total={meta?.countTotal}
      />
      ;
    </>
  );
};

export default ShowAllStudents;
