import { EnrollmentType } from './enrollment-type';

export interface Enrollment {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  value: number;
  type: EnrollmentType;
  createdAt: Date;
}
