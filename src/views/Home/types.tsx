export interface IGetUsersDocuments {
  code: string;
  message: string;
  data: IGetUsersDocumentsData[];
}

export interface IGetUsersDocumentsData {
  id: string,
  name: string,
  school_id: string,
  school_name: string,
  region: string,
  district: string,
  town_name: string,
  grade: string,
  grade_year: string,
  ob_handler_id: string,
  status: string,
  created: string,
  updated: string,
}

export interface IUserServicesData {
  id: string;
  service: string;
  campus_id: string;
  campus_name: string;
  status: string;
  created: string;
  status_desc: string;
  days_to_expire: number;
}

export interface IUserDocumentsData {
  created: string;
  description: string;
  id: string;
  name: string;
  ob_build: string;
  ob_handler_id: string;
  ob_message: string;
  status: string;
  status_desc: string;
  type: string;
  url: string;
}

export interface IUserDocumentsResponse {
  code: number;
  message: string;
  data: IUserDocumentsData[];
}

export interface IRequiredDocumentsProps {
  title: string;
  open: boolean;
  campusId: string;
  documentId: string;
  handleClose: () => void;
}

export interface IMessageModal {
  open: boolean;
  handleClose: () => void;
  message: string;
}


//Interfaz querella documents

export interface IQuerellaResponse {
  code: number;
  message: string;
  data: IQuerellaData[];
}

export interface IQuerellaData {
  id: string;
  ob_number: string;
  ob_name: string;
  ob_parent_handler_name: string;
  ob_status_name: string;
  ob_parent_status_name: string;
  ob_handler_id: string;
  status: string;
  ob_status: string;
  ob_title: string;
  is_end_process: string;
  created: string;
  updated: string;
  // A partir de aquí, los campos se corresponden directamente con los detalles de la querella
  case_number: string;
  topic: string;
  complainant_name: string;
  defendant_name: string;
  complainant_address: string;
  defendant_address: string;
  complainant_phone: string;
  defendant_phone: string;
  license_issued_number: string;
  complainant_email: string;
  defendant_email: string;
  event_date: string;
  event_place: string;
  witnesses: string;
  complaint_date: string;
  reject_comment: string;
}