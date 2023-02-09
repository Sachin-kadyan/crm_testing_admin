import useUserStore from '../store/userStore';
import Authenticated from './routes/Authenticated';
import UnAuthenticated from './routes/UnAuthenticated';
import cookie from 'js-cookie';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Roles } from '../constants/types';
import Support from './routes/Support';

const AppContainer = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const userString = cookie.get('user');

    if (userString) {
      const parsedUserString = JSON.parse(userString!);
      const token = parsedUserString.access;

      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        // console.log(decoded.exp * 1000 < Date.now());
        setUser(null);
      } else {
        setUser(parsedUserString);
      }
    } else {
      setUser(null);
    }
  }, [setUser]);
  if (
    user !== null &&
    (user.role === Roles.ADMIN || user.role === Roles.REPRESENTATIVE)
  ) {
    return <Authenticated />;
  } else if (user !== null && user.role === Roles.SUPPORT) {
    return <Support />;
  } else {
    return <UnAuthenticated />;
  }
};

export default AppContainer;
