import { Gender } from '../../user/types/gender';
import { Role } from '../../user/types/role';

export interface LoginResponseData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  gender: Gender;
  role: Role;
  birthDate: Date;
  disabilities: string;
  token: string;
}
