/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { schools, towns, userInfo, documentCreate } from "@/utils";
import useAuthStore from "@/hooks/useAuthStore";



interface IGeneralResponse {
  code: number;
  message: string;
  data: any;
}


export const requestSchools = async (townId: string) => {
  try {
    api.resource = schools;

    const res: IGeneralResponse = await api.post({
      body: {
        town_id: townId,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};



export const requestTowns = async () => {
  try {
    api.resource = towns;
    const res: IGeneralResponse = await api.get();
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const requestUserInfo = async (token: string) => {
  try {
    api.resource = userInfo;
    api.token = token;

    const res: IGeneralResponse = await api.get();

    return res.data;
  } catch (error) {
    throw error;
  }
};



interface ICreateQuerellaParams {
  complainant_name: string;
  complainant_phone: string;
  complainant_address: string;
  complainant_email: string;

  defendant_name: string;
  defendant_phone: string;
  defendant_address: string;
  defendant_email: string;

  case_number: string;
  topic: string;
  license_issued_number: string;
  event_date: string;
  event_place: string;
  complaint_date: string;
  reject_comment: string;
  witness_1: string;
  witness_2: string;
  witness_3: string;
  witness_4: string;

  token: string;
}

export type Ok = {
  code: number;
  message: string;
};

export const CreateRequest = async ({
  complainant_name,
  complainant_phone,
  complainant_address,
  complainant_email,

  defendant_name,
  defendant_phone,
  defendant_address,
  defendant_email,

  case_number,
  topic,
  license_issued_number,
  event_date,
  event_place,
  complaint_date,
  reject_comment,
  witness_1,
  witness_2,
  witness_3,
  witness_4,

  token
}: ICreateQuerellaParams) => {
  try {

    api.resource = documentCreate;
    api.token = token;
    const form_id = 1;
    const witnessesArray = [witness_1, witness_2, witness_3, witness_4];
    const witnesses = witnessesArray.filter(Boolean).join(', ');
    console.log('token')
    console.log(token)

    console.log({
      complainant_name,
      complainant_phone,
      complainant_address,
      complainant_email,

      defendant_name,
      defendant_phone,
      defendant_address,
      defendant_email,

      case_number,
      topic,
      license_issued_number,
      event_date,
      event_place,
      complaint_date,
      reject_comment,
      witnesses
    })

    const res = await api.post({
      body: {
        form_id,
        complainant_name,
        complainant_phone,
        complainant_address,
        complainant_email,

        defendant_name,
        defendant_phone,
        defendant_address,
        defendant_email,

        case_number,
        topic,
        license_issued_number,
        event_date,
        event_place,
        complaint_date,
        reject_comment,

        witnesses
        //unnecesary fields
      },
    })

    return res
  } catch (error) {
    throw error;
  }
};
