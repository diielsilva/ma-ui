export interface CreateUserRequestData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  gender: string;
  birthDate?: Date;
  disabilities?: string;
}
