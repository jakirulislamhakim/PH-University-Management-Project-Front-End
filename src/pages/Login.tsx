/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from 'antd';
import { SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/PHForm/PHForm';
import PHInput from '../components/PHForm/PHInput';

type TInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  // Access the location's state
  const from = location.state?.from?.pathname;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = useForm<TInputs>({
  //   defaultValues: {
  //     id: 'A-0001',
  //     password: 'admin123',
  //   },
  // });

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    // console.log(data);

    const id = toast.loading('Logins....', { id: 2 });
    try {
      const res = await login(data).unwrap();
      // deeded jwt token
      const user: TUser = jwtDecode(res.data.accessToken);

      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );

      toast.success('Successfully login', { id, duration: 2000 });

      // navigate user
      navigate(from ? from : `/${user.userRole}/dashboard`, { replace: true });
    } catch (error) {
      toast.error('Login failed !', { duration: 2000, id });
    }
  };

  const defaultValues = {
    id: 'A-0001',
    password: 'admin123',
  };

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <PHInput label="Id:" type={'text'} name={'id'} />
        </div>
        <div>
          <PHInput label="Password" type={'text'} name={'password'} />
        </div>
        <div>
          <Button htmlType="submit" /*loading={isSubmitting }*/>Login</Button>
        </div>
      </PHForm>
    </Row>
  );
};

export default Login;
