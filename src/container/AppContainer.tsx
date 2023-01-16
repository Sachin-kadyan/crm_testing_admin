import useUserStore from '../store/userStore';
import Authenticated from './routes/Authenticated';
import UnAuthenticated from './routes/UnAuthenticated';
import cookie from 'js-cookie';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AppContainer = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const userString = cookie.get('user');

    if (userString) {
      const parsedUserString = JSON.parse(userString!);
      const token = parsedUserString.access;

      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        setUser(null);
      } else {
        setUser(parsedUserString);
      }
    } else {
      setUser(null);
    }
  }, [setUser]);

  return user !== null ? <Authenticated /> : <UnAuthenticated />;
};

export default AppContainer;
