import { Button } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type TInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login,] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  // Access the location's state
  const from = location.state?.from?.pathname;

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
      console.log(error);
      toast.loading('Logins....', { id, duration: 2000 });
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
        Login
      </Button>
    </form>
  );
};

export default Login;
