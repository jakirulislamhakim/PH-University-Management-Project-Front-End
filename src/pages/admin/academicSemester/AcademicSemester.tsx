import { useGetAllAcademicSemesterQuery } from '../../../redux/features/admin/academicManegementApi';

import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { TAcademicSemester } from '../../../types/academicSemester.type';
import { useState } from 'react';
import { TQueryParams } from '../../../types';

type TTableData = { key: number } & Pick<
  TAcademicSemester,
  'name' | 'year' | 'startMonth' | 'endMonth'
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Autumn',
        value: 'Autumn',
      },
      {
        text: 'Summer',
        value: 'Summer',
      },
      {
        text: 'Fall',
        value: 'Fall',
      },
    ],
  },
  {
    title: 'Year',
    dataIndex: 'year',
    filters: [
      {
        text: '2024',
        value: '2024',
      },
      {
        text: '2025',
        value: '2025',
      },
      {
        text: '2026',
        value: '2026',
      },
      {
        text: '2027',
        value: '2027',
      },
      {
        text: '2028',
        value: '2028',
      },
    ],
  },
  {
    title: 'Start Month',
    dataIndex: 'startMonth',
  },
  {
    title: 'End Month',
    dataIndex: 'endMonth',
  },
  {
    title: 'Action',
    render: () => {
      return (
        <div>
          <Button type='primary'>Update</Button>
        </div>
      );
    },
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllAcademicSemesterQuery(params);

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryParams[] = [];
    if (extra.action === 'filter') {
      filters?.name?.forEach(name =>
        queryParams.push({ name: 'name', value: name as string })
      );
    }
    if (extra.action === 'filter') {
      filters?.year?.forEach(name =>
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

  const data: TTableData[] | undefined = semesterData?.semesterData.map(
    ({ name, year, startMonth, endMonth }, idx) => ({
      key: idx + 1,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  return (
    <Table<TTableData>
      columns={columns}
      dataSource={data}
      loading={isLoading || isFetching}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
};

export default AcademicSemester;
