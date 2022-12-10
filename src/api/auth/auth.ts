import { apiClient } from "../apiClient";

export const login = async (email: string, password: string) => {
  const { data } = await apiClient.post("/representative/login", {
    email,
    password,
  });
  return data;
};
