import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

type TDatePickerProps = {
  name: string;
  label: string;
  dateOfBirth?: string;
};

const PHDatePicker = ({ name, label, dateOfBirth }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <Form.Item label={label}>
              <DatePicker
                {...field}
                value={dateOfBirth ? dayjs(dateOfBirth) : null}
                size="large"
                style={{ width: '100%' }}
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHDatePicker;
