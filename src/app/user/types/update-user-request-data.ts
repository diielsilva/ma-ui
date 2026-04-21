import { Gender } from './gender';

export interface UpdateUserRequestData {
  name: string;
  email: string;
  password: string | null;
  cpf: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  disabilities: string | null;
}
