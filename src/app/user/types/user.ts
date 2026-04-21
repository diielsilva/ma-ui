import { Gender } from './gender';
import { Role } from './role';

export interface User {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  gender: Gender;
  role: Role;
  birthDate: Date;
  disabilities?: string;
}
