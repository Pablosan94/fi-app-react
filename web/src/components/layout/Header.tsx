import { GiTakeMyMoney } from 'react-icons/gi';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/">
        <GiTakeMyMoney className={styles.logo} />
      </a>
    </header>
  );
};

export default Header;
