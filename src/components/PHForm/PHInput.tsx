import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type?: string;
  name: string;
  label: string;
};

const PHInput = ({ type = 'text', name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <Form.Item label={label}>
              <Input type={type} id={name} {...field} size="large" />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHInput;
