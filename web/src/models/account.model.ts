import { CreateOperationDto } from '../services/operations.service';
import { Operation } from './operation.model';

export type Account = {
  operations: Operation[];
  balance: number;
  selectedOperations: Operation[];
  setOperations: (operations: Operation[]) => void;
  setBalance: (balance: number) => void;
  containsOperation: (operation: CreateOperationDto) => boolean;
  /* addOperation: (operations: Operation) => boolean;
  removeOperations: (operations: Operation[]) => void; */
  selectOperation: (id: number) => void;
  unselectOperation: (id: number) => void;
  resetSelectedOperations: () => void;
};
