import api from "@/utils/services/api";
import { patent, patentFiles, uploadPatentFile, submitPatent, deleteSinglePatentFile } from "@/utils";
import { FormikProps } from "formik";

export const VALID_COUNTRIES = ['US', 'DO', 'PR']

interface TSCTypesOption {
  value: number | string;
  label: string;
}

export const TSC_TYPE: TSCTypesOption[] = [
  { value: 1, label: 'Persona' },
  { value: 2, label: 'Organización' },
];

export const makeStepAvailable = (currentStep: number, setStepValidity: (callback: (prev: boolean[]) => boolean[]) => void) => {
  setStepValidity((prev) =>
    prev.map((val, index) =>
      // Habilitar el paso actual y el siguiente, pero sin exceder el índice del array
      index === currentStep || index === currentStep + 1 ? true : val
    )
  );
};


export const MAIN_COUNTRY = 'US';

export function mainCountrySelected(value: string): boolean {
  return value !== MAIN_COUNTRY;
}

export interface StepFormProps {
  token: string,
  handleNext: () => void;
  handleBack: (() => void) | null;
  isLastStep: boolean;
  isMobile: boolean;
  setStepValidity: (callback: (prev: boolean[]) => boolean[]) => void;
  currentStep: number;
}

export interface StepForm1Request {
  record_type: string;
  patent_type: string;
  general_fiscal_year_business_startup: string;
  general_phone: string;
  general_social_security: string;
  general_company_name: string;
  general_first_name: string;
  general_last_name: string;
  general_second_name?: string;
  general_second_last_name?: string;
  general_tsc: string;
  token: string
}

export interface StepForm2Request {
  postal_address_line1: string;
  postal_address_line2?: string;
  postal_address_number: string;
  postal_address_country: string;
  postal_address_state: string;
  postal_address_city: string;
  postal_address_zipcode: string;
  address_line1: string;
  address_line2: string;
  address_number: string;
  address_country: string;
  address_state: string;
  address_city?: string;
  address_zipcode: string;
  token: string
}

export interface StepForm3Request {
  taxpayerhome_address_line1: string;
  taxpayerhome_address_line2?: string;
  taxpayerhome_address_number: string;
  taxpayerhome_address_country: string;
  taxpayerhome_address_state: string;
  taxpayerhome_address_city: string;
  taxpayerhome_address_zipcode: string;
  taxpayerwork_address_line1: string;
  taxpayerwork_address_line2: string;
  taxpayerwork_address_number: string;
  taxpayerwork_address_country: string;
  taxpayerwork_address_state: string;
  taxpayerwork_address_city?: string;
  taxpayerwork_address_zipcode: string;
  token: string;
}

export interface StepForm4Request {
  agent_info_name: string;
  agent_info_email: string;
  agent_info_role: string;
  agent_info_social_security: string;
  owner_info_name: string;
  owner_info_email: string;
  owner_info_role: string;
  owner_info_social_security: string;
  token: string
}

export interface StepForm5Request {
  business_info_startup_date: string;
  business_info_location_name: string;
  business_info_industry: string;
  business_info_activity: string;
  business_info_register_number: string;
  business_info_register_number_expiration_date: string;
  business_info_withholding_agent: boolean;
  business_info_employees: number;
  business_info_total_annual_labor_costs: number;
  business_info_cadastral_reference_number?: string;
  business_info_require_permit_use: boolean;
  business_info_permit_use_number: string;
  business_info_permit_use_number_expiration_date: string;
  business_info_permit_use_number_description: string;
  token: string;
}

export interface StepForm6Request {
  document: File;
  patent_id: string;
  file_id: string;
  token: string;
}

export interface StepForm7Request {
  patent_id: string;
  token: string;
}



export type Ok = {
  code: number;
  message: string;
};


interface DeletePatentFileProp {
  patent_id: string | number;
  file_id: string | number;
  token: string;
}

export const getPatentData = async (token: string) => {
  try {
    api.resource = patent;
    api.token = token;

    const res: any = await api.get({
      body: {
        request_type: "0",
        status: "0",
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPatentFiles = async (token: string, patent_id: string) => {
  try {
    api.resource = patentFiles;
    api.token = token;

    const res = await api.post({
      body: {
        patent_id,
      },
    })

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerPatentPage1 = async ({
  record_type,
  patent_type,
  general_fiscal_year_business_startup,
  general_phone,
  general_social_security,
  general_company_name,
  general_first_name,
  general_last_name,
  general_second_name,
  general_second_last_name,
  general_tsc,
  token,

}: StepForm1Request) => {
  try {
    api.resource = patent;
    api.token = token;

    const res = await api.post({
      body: {
        record_type,
        patent_type,
        general_fiscal_year_business_startup,
        general_phone,
        general_social_security,
        general_company_name,
        general_first_name,
        general_last_name,
        general_second_name,
        general_second_last_name,
        general_tsc,
        page: 1
      },
    })

    return res
  } catch (error) {
    console.log(error)
    throw error;
  }

};

export const registerPatentPage2 = async ({
  postal_address_line1,
  postal_address_line2,
  postal_address_number,
  postal_address_country,
  postal_address_state,
  postal_address_city,
  postal_address_zipcode,
  address_line1,
  address_line2,
  address_number,
  address_country,
  address_state,
  address_city,
  address_zipcode,
  token

}: StepForm2Request) => {
  try {
    api.resource = patent;
    api.token = token;

    const res = await api.post({
      body: {
        postal_address_line1,
        postal_address_line2,
        postal_address_number,
        postal_address_country,
        postal_address_state,
        postal_address_city,
        postal_address_zipcode,
        address_line1,
        address_line2,
        address_number,
        address_country,
        address_state,
        address_city,
        address_zipcode,
        page: 2
      },
    })

    return res
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const registerPatentPage3 = async ({
  taxpayerhome_address_line1,
  taxpayerhome_address_line2,
  taxpayerhome_address_number,
  taxpayerhome_address_country,
  taxpayerhome_address_state,
  taxpayerhome_address_city,
  taxpayerhome_address_zipcode,
  taxpayerwork_address_line1,
  taxpayerwork_address_line2,
  taxpayerwork_address_number,
  taxpayerwork_address_country,
  taxpayerwork_address_state,
  taxpayerwork_address_city,
  taxpayerwork_address_zipcode,
  token,
}: StepForm3Request) => {
  try {
    api.resource = patent;
    api.token = token;

    const res = await api.post({
      body: {
        taxpayerhome_address_line1,
        taxpayerhome_address_line2,
        taxpayerhome_address_number,
        taxpayerhome_address_country,
        taxpayerhome_address_state,
        taxpayerhome_address_city,
        taxpayerhome_address_zipcode,
        taxpayerwork_address_line1,
        taxpayerwork_address_line2,
        taxpayerwork_address_number,
        taxpayerwork_address_country,
        taxpayerwork_address_state,
        taxpayerwork_address_city,
        taxpayerwork_address_zipcode,
        page: 3
      },
    })

    return res
  } catch (error) {
    console.log(error)
    throw error;
  }
};


export const registerPatentPage4 = async ({
  agent_info_name,
  agent_info_email,
  agent_info_role,
  agent_info_social_security,
  owner_info_name,
  owner_info_email,
  owner_info_role,
  owner_info_social_security,
  token
}: StepForm4Request) => {
  try {
    api.resource = patent;
    api.token = token;

    const res = await api.post({
      body: {
        agent_info_name,
        agent_info_email,
        agent_info_role,
        agent_info_social_security,
        owner_info_name,
        owner_info_email,
        owner_info_role,
        owner_info_social_security,
        page: 4
      },
    })

    return res
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const registerPatentPage5 = async ({
  business_info_startup_date,
  business_info_location_name,
  business_info_industry,
  business_info_activity,
  business_info_register_number,
  business_info_register_number_expiration_date,
  business_info_withholding_agent,
  business_info_employees,
  business_info_total_annual_labor_costs,
  business_info_cadastral_reference_number,
  business_info_require_permit_use,
  business_info_permit_use_number,
  business_info_permit_use_number_expiration_date,
  business_info_permit_use_number_description,
  token
}: StepForm5Request) => {
  try {
    api.resource = patent;
    api.token = token;

    const res = await api.post({
      body: {
        business_info_startup_date,
        business_info_location_name,
        business_info_industry,
        business_info_activity,
        business_info_register_number,
        business_info_register_number_expiration_date,
        business_info_withholding_agent,
        business_info_employees,
        business_info_total_annual_labor_costs,
        business_info_cadastral_reference_number,
        business_info_require_permit_use,
        business_info_permit_use_number,
        business_info_permit_use_number_expiration_date,
        business_info_permit_use_number_description,
        page: 5
      },
    })

    return res
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const uploadPatentFiles = async ({
  document,
  patent_id,
  file_id,
  token

}: StepForm6Request) => {
  try {
    api.resource = uploadPatentFile;
    api.token = token;

    const res = await api.post({
      body: {
        document,
        patent_id,
        file_id,
      },
    })

    return res
  } catch (error) {
    console.log(error)
    throw error;
  }

};

export const deletePatentFile = async ({
  patent_id,
  file_id,
  token,
}: {
  patent_id: string | number;
  file_id: string | number;
  token: string;
}) => {
  try {
    //URL dinámica con los parámetros
    const urlDeleteFile = `${deleteSinglePatentFile}?patent_id=${patent_id}&file_id=${file_id}`;
    // Configuramos el recurso base y el token
    api.resource = urlDeleteFile;
    api.token = token;
    //solicitud DELETE
    const res = await api.delete();

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const submitPatentRequest = async (patent_id: string, token: string) => {
  try {
    api.resource = submitPatent;
    api.token = token;

    const res = await api.post({
      body: {
        patent_id,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
