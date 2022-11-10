import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Operation } from '../models/operation.model';

export type CreateOperationDto = {
  amount: number;
  date: string;
  concept: string;
};

export async function fetchOperations(date: Date): Promise<Operation[]> {
  const from = format(startOfMonth(date), 'yyyy-MM-dd');
  const to = format(endOfMonth(date), 'yyyy-MM-dd');
  const response = await fetch(
    `http://localhost:3000/api/operations?from=${from}&to=${to}`
  );
  return response.json();
}

export async function fetchOperation(id: number): Promise<Operation> {
  const response = await fetch(`http://localhost:3000/api/operations/${id}`);
  return response.json();
}

export async function createOperation(
  body: CreateOperationDto
): Promise<Operation> {
  const response = await fetch(`http://localhost:3000/api/operations`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}

export async function deleteOperation(id: number): Promise<Operation> {
  const response = await fetch(`http://localhost:3000/api/operations/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
