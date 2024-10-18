import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { TSelectOptionsType } from '../../types';

type TPHSelectProps = {
  name: string;
  label: string;
  disabled?: boolean;
  options: TSelectOptionsType;
};

const PHSelect = ({ name, label, options, disabled }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            disabled={disabled}
            defaultValue={'Select'}
            {...field}
            options={options}
            size="large"
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
