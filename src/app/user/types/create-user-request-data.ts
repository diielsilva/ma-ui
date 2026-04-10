import { Gender } from './gender';

export interface CreateUserRequestData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  disabilities: string | null;
}
