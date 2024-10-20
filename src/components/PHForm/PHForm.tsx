import { Form } from 'antd';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TPHFormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
  disabled?: boolean;
} & TFormConfig;

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  disabled = false,
}: TPHFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  // console.log(formConfig);

  const methods = useForm(formConfig);

  const handleOnSubmit: SubmitHandler<FieldValues> = (data) => {
    methods.reset();
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        onFinish={methods.handleSubmit(handleOnSubmit)}
        disabled={disabled}
      >
        {children}
      </Form>
      ;
    </FormProvider>
  );
};

export default PHForm;
