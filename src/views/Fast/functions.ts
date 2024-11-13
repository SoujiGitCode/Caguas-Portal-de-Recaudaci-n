/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { schools, towns, documentCreateFast, userInfo, documentCreate } from "@/utils";
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


interface IFastRequestParams {
  email: string;
  schoolTown: string;
  school_code: string,
  grade: string,
  grade_year: string,
  identification_type: string;
  identification: string;
  first_name: string;
  second_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  gender: string;
  depr_first_name: string;
  depr_second_name: string
  depr_last_name: string;
  depr_second_last_name: string;
  phone: string;
  social_security: string;
  email1: string;
  email2: string;
  token: string;
}

export type Ok = {
  code: number;
  message: string;
};

export const fastRequest = async ({
  email,
  schoolTown,
  school_code,
  grade,
  grade_year,
  identification_type,
  identification,
  first_name,
  second_name,
  last_name,
  second_last_name,
  birthdate,
  gender,
  depr_first_name,
  depr_second_name,
  depr_last_name,
  depr_second_last_name,
  phone,
  social_security,
  email1,
  email2,
  token
}: IFastRequestParams) => {
  try {

    api.resource = token.length > 0 ? documentCreate : documentCreateFast;
    api.token = token;

    console.log({
      email,
      schoolTown,
      school_code,
      grade,
      grade_year,
      identification_type,
      identification,
      first_name,
      second_name,
      last_name,
      second_last_name,
      birthdate,
      gender,
      depr_first_name,
      depr_second_name,
      depr_last_name,
      depr_second_last_name,
      phone,
      social_security,
      email1,
      email2
    })

    const res = await api.post({
      body: {
        email,
        school_code,
        grade,
        grade_year,
        identification_type,
        identification,
        first_name,
        second_name,
        last_name,
        second_last_name,
        birthdate,
        gender,
        depr_first_name,
        depr_second_name,
        depr_last_name,
        depr_second_last_name,
        phone,
        social_security,
        email1,
        email2,

        //unnecesary fields
        depr_birthdate: birthdate,
        depr_gender: gender,
        depr_phone: phone,
        depr_social_security: social_security,

        certification_type_id: '1', //1 para certificado de graduación
      },
    })

    return res
  } catch (error) {
    throw error;
  }
};
