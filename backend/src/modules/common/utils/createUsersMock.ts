import { readFileSync } from 'fs';
import { UserInterface } from 'src/modules/user/interfaces/user.interface';

export const createUsersMock = (filePath: string): UserInterface[] => {
  const jsonString = readFileSync(filePath, 'utf-8');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return JSON.parse(jsonString)[1] as UserInterface[];
};
