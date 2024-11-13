/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { register, getAllSecurityQuestions, confirmEmail } from "@/utils";

interface IUserRegisterParams {
  email: string;
  password: string;
  identification: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  phone: string;
  social_security: string;
  security_question1: string;
  security_answer1: string;
  security_answer2: string;
  security_question2: string;
  security_question3: string;
  security_answer3: string;
}

export type Ok = {
  code: number;
  message: string;
};

export const requestRegister = async ({
  email,
  password,
  identification,
  first_name,
  middle_name,
  last_name,
  second_last_name,
  phone,
  social_security,
  security_question1,
  security_answer1,
  security_answer2,
  security_question2,
  security_question3,
  security_answer3
}: IUserRegisterParams) => {
  try {
    api.resource = register;

    console.log({
      email,
      password,
      identification,
      first_name,
      middle_name,
      last_name,
      second_last_name,
      phone,
      social_security,
      security_question1,
      security_answer1,
      security_answer2,
      security_question2,
      security_question3,
      security_answer3
    })

    const res = await api.post({
      body: {
        email,
        password,
        identification,
        first_name,
        middle_name,
        last_name,
        second_last_name,
        phone,
        social_security,
        security_question1,
        security_answer1,
        security_answer2,
        security_question2,
        security_question3,
        security_answer3
      },
    })

    return res
  } catch (error) {
    throw error;
  }



};

export const getSecurityQuestionsList = async () => {
  try {
    api.resource = getAllSecurityQuestions;
    const res = await api.get()
    return res
  } catch (error) {
    throw error;
  }



};


export const requestConfirmEmail = async ({
  email,
  confirm_email_code,
}: {
  email: string;
  confirm_email_code: string;
}) => {
  try {
    api.resource = confirmEmail; // Asegúrate de definir `confirmEmail` como el endpoint adecuado

    const formData = new FormData();
    formData.append('email', email);
    formData.append('confirm_email_code', confirm_email_code);

    const res = await api.post({
      body: formData,
    });

    return res;
  } catch (error) {
    throw error;
  }
};
