import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { DEV_URI } from '@/utils/constants';

const BASE_URL = DEV_URI;

const MakeHeaders = () => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  };
  return { ...headers };
};

const CreateAxiosInstance = (cfg: AxiosRequestConfig = {}): AxiosInstance => {
  const axiosConfig = {
    baseURL: BASE_URL,
    timeout: 1000 * 35,
    responseType: <ResponseType>'json',
    headers: MakeHeaders(),
    ...cfg,
  };
  return axios.create(axiosConfig);
};

function makeError(err: {}, message: string) {
  const error = new Error(message);
  return error;
}

function responseParser<SuccessType>(response: AxiosResponse): SuccessType {
  if (response.data?.message?.server_message) {
    const error = new Error(response.data.message.server_message);
    throw error;
  }

  return response.data;
}

const errorParser = (err: any): { message: string, statusCode: number } => {
  let error = err;
  if (err.response && err.response.data) {
    // eslint-disable-next-line prefer-destructuring

    error = err.response.data || {};
    console.log(typeof (err.response.status))
    error.statusCode = err.response.status;

    console.log(error)

    let message = error.message;

    // throw makeError(error, message);
  }
  throw error;
};

interface Params<T> {
  body?: T;
  qs?: T;
}

type AxiosVerb = 'get' | 'post' | 'put' | 'delete';

interface Parameters {
  data?: unknown;
  body?: unknown;
  params?: unknown;
}

const AxiosDispatchResponse = async <ResponseType, ParamsType>(
  cls: ApiRequest,
  verb: AxiosVerb,
  params?: Params<ParamsType>,
): Promise<ResponseType> => {
  const { body, qs } = params || {};
  const self = cls;
  let parameters: Parameters = {};

  if (!body && !qs && !isEmpty(params)) {
    parameters.data = params;
  } else if (body) {
    parameters = body;
  } else if (qs) {
    parameters.params = qs;
  }
  try {
    self.axiosInstance.defaults.headers.common['token'] = self.token
    const response: AxiosResponse = await self.axiosInstance[verb](self.resource, parameters);
    return responseParser<ResponseType>(response);
  } catch (e) {
    throw errorParser(e);
  }
};

let that: ApiRequest | null = null;
class ApiRequest {
  resource = '';
  token = '';
  axiosInstance: AxiosInstance;
  constructor() {
    this.resource = '';
    this.token = '';
    this.axiosInstance = CreateAxiosInstance();
    that = this;
  }

  get<ResponseType, ParamsType = unknown>(params?: Params<ParamsType>): Promise<ResponseType> {
    return AxiosDispatchResponse<ResponseType, ParamsType>(this || that, 'get', params);
  }

  put<ResponseType, ParamsType = unknown>(params?: Params<ParamsType>): Promise<ResponseType> {
    return AxiosDispatchResponse<ResponseType, ParamsType>(this || that, 'put', params);
  }

  post<ResponseType, ParamsType = unknown>(params?: Params<ParamsType>): Promise<ResponseType> {
    return AxiosDispatchResponse<ResponseType, ParamsType>(this || that, 'post', params);
  }

  delete<ResponseType, ParamsType = unknown>(params?: Params<ParamsType>): Promise<ResponseType> {
    return AxiosDispatchResponse<ResponseType, ParamsType>(this || that, 'delete', params);
  }
}

export default ApiRequest;
