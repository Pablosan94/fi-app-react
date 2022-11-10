import { addMonths, startOfMonth } from 'date-fns';
import { PropsWithChildren, useState } from 'react';
import { UiContext } from './ui.context';

export const UiContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDrawerRendered, setIsDrawerRendered] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(
    startOfMonth(new Date())
  );

  const openDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerRendered(true);
      setTimeout(() => {
        setIsDrawerOpen(true);
      }, 0);
    }
  };

  const closeDrawer = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
      setTimeout(() => {
        setIsDrawerRendered(false);
      }, 800);
    }
  };

  const previousMonth = () => {
    setCurrentDate((previousDate) => addMonths(previousDate, -1));
  };

  const nextMonth = () => {
    setCurrentDate((previousDate) => addMonths(previousDate, 1));
  };

  return (
    <UiContext.Provider
      value={{
        isDrawerOpen,
        isDrawerRendered,
        currentDate,
        openDrawer,
        closeDrawer,
        previousMonth,
        nextMonth,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
