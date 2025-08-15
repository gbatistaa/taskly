import { CommonEntityInterface } from 'src/modules/common/interfaces/common.interface';

export interface TeamInterface extends CommonEntityInterface {
  ownerId: string;
  name: string;
  company: string;
  description: string;
}
