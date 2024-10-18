import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  name: string;
  label: string;
};

const PHFileUPload = ({ name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <Form.Item label={label}>
              <Input
                type="file"
                value={value?.files}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  onChange(file); // Pass the file to react-hook-form
                }}
                id={name}
                {...field}
                size="large"
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHFileUPload;
