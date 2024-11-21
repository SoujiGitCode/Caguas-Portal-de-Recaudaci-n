import api from "@/utils/services/api";
import { getDocuments, userInfo } from "@/utils";
// import { IQuerellaResponse } from './types'

// export const getUserDocuments = async (token: string) => {
//     try {
//         api.resource = getDocuments;
//         api.token = token;

//         const res = await api.get<IQuerellaResponse>({
//             body: {

//             }
//         });
//         return res.data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };


interface IGeneralResponse {
    code: number;
    message: string;
    data: any;
}

export const requestUserInfo = async (token: string) => {
    try {
        api.resource = userInfo;
        api.token = token;
        const res: IGeneralResponse = await api.get();
        return res;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

