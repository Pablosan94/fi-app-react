import { format } from 'date-fns';
import { PropsWithChildren, useState } from 'react';
import { Operation } from '../models/operation.model';
import { CreateOperationDto } from '../services/operations.service';
import { AccountContext, initialAccountContext } from './account.context';

export const AccountContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [operations, setOperations] = useState<Operation[]>(
    initialAccountContext.operations
  );
  const [balance, setBalance] = useState<number>(initialAccountContext.balance);
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>(
    initialAccountContext.selectedOperations
  );

  const setOperationsValue = (newOperations: Operation[]) => {
    setOperations(newOperations);
  };

  const setBalanceValue = (newBalance: number) => {
    setBalance(newBalance);
  };

  const addOperation = (newOperation: Operation): boolean => {
    const existingOperation = operations.findIndex(
      (op) =>
        newOperation.amount === op.amount &&
        newOperation.concept === op.concept &&
        newOperation.date.getTime() === op.date.getTime()
    );

    if (existingOperation === -1) {
      return true;
    }

    return false;
  };

  const removeOperations = () => {
    selectedOperations.forEach((selectedOperation) => {
      const existingOperation = operations.find(
        (op) => selectedOperation.id === op.id
      );

      if (existingOperation) {
        setOperations((previous) =>
          previous.filter((op) => existingOperation.id !== op.id)
        );
      }
    });

    resetSelectedOperations();
  };

  const containsOperation = (operation: CreateOperationDto) => {
    const existingOperation = operations.findIndex(
      (op) =>
        operation.amount === op.amount &&
        operation.concept === op.concept &&
        operation.date === format(op.date, 'yyyy-MM-dd')
    );

    return existingOperation !== -1;
  };

  const selectOperation = (id: number) => {
    const operation = operations.find((op) => op.id === id);
    if (operation) {
      setSelectedOperations((previous) => [...previous, operation]);
    }
  };

  const unselectOperation = (id: number) => {
    setSelectedOperations((previous) => previous.filter((op) => id !== op.id));
  };

  const resetSelectedOperations = () => {
    setSelectedOperations([]);
  };

  return (
    <AccountContext.Provider
      value={{
        operations,
        balance,
        selectedOperations,
        setOperations: setOperationsValue,
        setBalance: setBalanceValue,
        containsOperation,
        selectOperation,
        unselectOperation,
        resetSelectedOperations,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
