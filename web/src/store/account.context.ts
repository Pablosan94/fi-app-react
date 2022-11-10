import React from 'react';
import { Account } from '../models/account.model';

export const initialAccountContext: Account = {
  operations: [],
  balance: 0,
  selectedOperations: [],
  setOperations: () => {},
  setBalance: () => {},
  containsOperation: () => {
    return true;
  },
  /* addOperation: () => {
    return true;
  },
  removeOperations: () => {}, */
  selectOperation: () => {},
  unselectOperation: () => {},
  resetSelectedOperations: () => {},
};

export const AccountContext = React.createContext(initialAccountContext);
