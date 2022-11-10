import cn from 'classnames';
import { format } from 'date-fns';
import { useContext, useEffect, useRef } from 'react';
import { Operation } from '../models/operation.model';
import { AccountContext } from '../store/account.context';

import styles from './Movement.module.css';

const Movement: React.FC<Operation> = ({ id, amount, date, concept }) => {
  const { selectedOperations, selectOperation, unselectOperation } =
    useContext(AccountContext);
  const movementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const selectedOperation = selectedOperations.find((op) => op.id === id);

    if (selectedOperation) {
      movementRef.current?.classList.add(styles.selected);
    }
  }, [selectedOperations]);

  const handleClick = () => {
    movementRef.current?.classList.toggle(styles.selected);
    if (movementRef.current?.classList.contains(styles.selected)) {
      selectOperation(id);
    } else {
      unselectOperation(id);
    }
  };

  return (
    <span
      className={cn(
        styles.movement,
        amount > 0 ? styles.positive : styles.negative
      )}
      ref={movementRef}
      onClick={handleClick}
    >
      {amount.toFixed(2)}€ por {concept}
      <span className={styles.date}>
        {format(new Date(date), 'dd/MM/yyyy')}
      </span>
    </span>
  );
};

export default Movement;
