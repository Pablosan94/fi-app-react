import cn from 'classnames';
import { useContext, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaTrashAlt,
} from 'react-icons/fa';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import styles from './App.module.css';
import Header from './components/layout/Header';
import Movement from './components/Movement';
import MovementForm from './components/MovementForm';
import Card from './components/ui/Card';
import {
  batchDeleteOperations,
  deleteOperation,
  DeleteOperationsDto,
  fetchOperations,
} from './services/operations.service';
import { AccountContext } from './store/account.context';
import { UiContext } from './store/ui.context';

function App() {
  const queryClient = useQueryClient();
  const { currentDate, openDrawer, previousMonth, nextMonth } =
    useContext(UiContext);
  const {
    balance,
    selectedOperations,
    setBalance,
    setOperations,
    resetSelectedOperations,
  } = useContext(AccountContext);

  const {
    isLoading,
    isError,
    data: fetchedOperations,
    error,
  } = useQuery({
    queryKey: ['operations', currentDate],
    queryFn: () => fetchOperations(currentDate),
  });

  const removeOperationMutation = useMutation({
    mutationFn: (body: { operationIds: number[] }) =>
      batchDeleteOperations(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operations', currentDate] });
      resetSelectedOperations();
    },
  });

  useEffect(() => {
    if (fetchedOperations) {
      setOperations(fetchedOperations);
      const initialBalance = fetchedOperations.reduce(
        (prev, curr) => prev + curr.amount,
        0
      );
      setBalance(initialBalance);
    }
  }, [fetchedOperations]);

  const handleDelete = () => {
    const ids: number[] = [];
    selectedOperations.forEach((operation) => {
      ids.push(operation.id);
      removeOperationMutation.mutate({ operationIds: ids });
    });
  };

  const handleNavigation = (direction: string) => {
    resetSelectedOperations();
    if (direction === 'previous') {
      previousMonth();
    } else if (direction === 'next') {
      nextMonth();
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.summary}>
          <nav className={styles.navigation}>
            <button onClick={() => handleNavigation('previous')}>
              <FaChevronLeft />
            </button>
            <h1>{format(currentDate, 'MMMM yyyy', { locale: esLocale })}</h1>
            <button onClick={() => handleNavigation('next')}>
              <FaChevronRight />
            </button>
          </nav>

          <Card className={styles.movementCard}>
            <div className={styles.movements}>
              {!isLoading &&
                !isError &&
                fetchedOperations.map((operation) => (
                  <Movement
                    id={operation.id}
                    amount={operation.amount}
                    date={operation.date}
                    concept={operation.concept}
                    key={operation.id}
                  />
                ))}
            </div>

            <div className={styles.balance}>
              <span>Balance</span>
              <div className={styles.cta}>
                <button className={styles.add} onClick={openDrawer}>
                  <FaPlus />
                </button>
                <button
                  className={styles.remove}
                  onClick={handleDelete}
                  disabled={selectedOperations.length === 0}
                >
                  <FaTrashAlt />
                </button>
              </div>
              <span
                className={cn(
                  balance > 0
                    ? styles.positive
                    : balance < 0
                    ? styles.negative
                    : ''
                )}
              >
                {balance.toFixed(2)}€
              </span>
            </div>
          </Card>
        </div>

        <MovementForm />
      </main>
    </>
  );
}

export default App;
