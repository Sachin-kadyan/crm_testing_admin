import useUserStore from '../../store/userStore';
import { login } from './auth';
import cookie from 'js-cookie';
import { redirect } from 'react-router-dom';

export const loginHandler = async (email: string, password: string) => {
  console.log(email, password, 'FromAuth');
  const { setUser } = useUserStore.getState();
  const user = (await login(email, password)) as any;
  cookie.set('user', JSON.stringify(user));
  setUser(user);
  return redirect('/');
};
