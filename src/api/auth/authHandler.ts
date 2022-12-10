import useUserStore from "../../store/userStore";
import { login } from "./auth";
import cookie from "js-cookie";

export const loginHandler = async (email: string, password: string) => {
  const { setUser } = useUserStore.getState();
  const user = (await login(email, password)) as any;
  cookie.set("user", JSON.stringify(user));
  setUser(user);
};
