import api from "@/utils/services/api";
import { login } from "@/utils";
import { IUserLogin } from "@/routes/types/responses";

interface IUserLoginParams {
  email: string;
  password: string;
}

export const requestLogin = async ({ email, password }: IUserLoginParams) => {
  try {
    api.resource = login;

    const res = await api.post<IUserLogin>({ body: { email, password } });
    return res;
  } catch (error) {
    throw error;
  }
};
