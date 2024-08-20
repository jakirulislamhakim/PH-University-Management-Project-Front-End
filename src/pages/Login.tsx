import { Button } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { jwtDecode } from 'jwt-decode';

type TInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  console.log('error =>', error);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TInputs>({
    defaultValues: {
      id: 'A-0001',
      password: 'admin123',
    },
  });

  const onSubmit: SubmitHandler<TInputs> = async data => {
    try {
      const res = await login(data).unwrap();
      // deeded jwt token
      const user = jwtDecode(res.data.accessToken);

      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">Id</label>
        <input
          type="text"
          id="id"
          {...register('id', { required: 'id is required' })}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          {...register('password', { required: 'password is required' })}
        />
      </div>
      <Button htmlType="submit" loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default Login;
