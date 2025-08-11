export interface UserInterface {
  id: string;
  cpf: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  salt: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
