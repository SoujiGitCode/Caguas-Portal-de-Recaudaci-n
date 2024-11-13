import { IUserLoginData } from './user';

// POST - USER LOGIN
export interface IUserLogin {
  code: string;
  message: string;
  data: IUserLoginData;
}

export interface ILogOut {
  code: number;
  message: string;
}

interface ResponseActions {
  action: string;
  id: string;
};

export interface IProfileModifyResponse {
  code: number;
  data: ResponseActions;
};