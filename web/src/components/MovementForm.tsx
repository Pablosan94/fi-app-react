import { useMutation, useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { Operation } from '../models/operation.model';
import {
  createOperation,
  CreateOperationDto,
} from '../services/operations.service';
import { AccountContext } from '../store/account.context';
import { UiContext } from '../store/ui.context';
import styles from './MovementForm.module.css';

type FormData = {
  amount: string;
  date: string;
  concept: string;
};

const MovementForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setFocus,
    reset: resetForm,
    formState: { isValid },
  } = useForm<FormData>();
  const { isDrawerOpen, isDrawerRendered, closeDrawer } = useContext(UiContext);
  const { containsOperation } = useContext(AccountContext);

  const [alreadyExistsError, setAlreadyExistsError] = useState<boolean>(false);

  const createOperationMutation = useMutation({
    mutationFn: (newOperation: CreateOperationDto) =>
      createOperation(newOperation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operations'] });
    },
  });

  const onSubmit = (data: FormData) => {
    const operation: CreateOperationDto = {
      amount: +data.amount,
      date: data.date,
      concept: data.concept,
    };

    if (isValid) {
      if (!containsOperation(operation)) {
        createOperationMutation.mutate(operation);
        setAlreadyExistsError(false);
        // closeDrawer();
        resetForm();
      } else {
        setAlreadyExistsError(true);
      }
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      setTimeout(() => {
        setFocus('amount');
      }, 800);
    }
  }, [isDrawerOpen, setFocus]);

  return (
    <>
      {isDrawerRendered && (
        <form
          className={cn(
            styles.formDrawer,
            isDrawerOpen ? styles.open : styles.closed
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FaTimes className={styles.closeIcon} onClick={closeDrawer} />
          <h1>Añadir movimiento</h1>
          <div className={styles.formControl}>
            <label htmlFor="amount">Cantidad</label>
            <input
              type="number"
              id="amount"
              {...register('amount', { required: true })}
            />
          </div>
          <div className={cn(styles.formControl, styles.calendar)}>
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              id="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
              {...register('date')}
            />
            {/* <FaCalendarAlt className={styles.calendarIcon} /> */}
          </div>
          <div className={styles.formControl}>
            <label htmlFor="concept">Concepto</label>
            <input
              type="text"
              id="concept"
              {...register('concept', { required: true })}
            />
          </div>
          <button disabled={!isValid}>Añadir</button>
          {alreadyExistsError && (
            <span className={styles.duplicateError}>Movimiento duplicado</span>
          )}
        </form>
      )}
    </>
  );
};

export default MovementForm;
