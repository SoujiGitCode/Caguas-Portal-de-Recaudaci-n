/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import api from "@/utils/services/api";
import { userDocuments } from "@/utils";
import { IUserDocumentsResponse } from "../types";

export const getUserDocuments = async (
  campusId: string,
  token: string,
  documentId: string,
  show: number = 1
) => {
  try {
    api.resource = userDocuments;
    api.token = token;

    const res = await api.post<IUserDocumentsResponse>({
      body: {
        campus_id: campusId,
        id: documentId,
        show,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
