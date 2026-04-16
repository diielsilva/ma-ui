import { Role } from '../../user/types/role';

export interface LoginResponseData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  gender: string;
  role: Role;
  birthDate: Date;
  disabilities: string;
  token: string;
}
