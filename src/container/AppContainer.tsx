import useUserStore from "../store/userStore";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/UnAuthenticated";
import cookie from "js-cookie";
import { useEffect } from "react";

const AppContainer = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    // cookie.remove("user");
    const userString = cookie.get("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, [setUser]);

  return user !== null ? <Authenticated /> : <UnAuthenticated />;
};

export default AppContainer;
