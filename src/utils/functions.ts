import api from "@/utils/services/api";
import { logout, updateUserProfile } from "@/utils";
import { ILogOut, IProfileModifyResponse } from "@/routes/types/responses";
import { UserProfile } from "@/routes/types/user";

export const logOut = async (token: string) => {
  try {
    api.resource = logout;

    const res = await api.post<ILogOut>({ body: { token } });

    return res;
  } catch (error) {
    throw error;
  }
};

export const editProfile = async (token: string, body: UserProfile) => {
  try {
    api.resource = updateUserProfile;
    api.token = token;

    const res = await api.post<IProfileModifyResponse>({ body });

    return res.data;
  } catch (error) {
    throw error;
  }
};
