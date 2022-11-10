import styles from './Card.module.css';
import cn from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className = '' }) => {
  return <div className={cn(styles.card, className)}>{children}</div>;
};

export default Card;
