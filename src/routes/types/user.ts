export interface IUserLoginData {
  token: string;
  verified: boolean;
  description: string;
}

export interface UserProfile {
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  student_id: string;
  birthdate: string;
  cell_phone: string;
  alternative_phone: string;
  email: string;
  institucional_email: string;
  entrance_year: string;
  campus: string;
  entrance_terms: string;
  address_line1: string;
  address_line2: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  password?: string;
  program: string;
}