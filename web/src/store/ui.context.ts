import React from 'react';

export const initialUiContext = {
  isDrawerOpen: false,
  isDrawerRendered: false,
  currentDate: new Date(),
  openDrawer: () => {},
  closeDrawer: () => {},
  previousMonth: () => {},
  nextMonth: () => {},
};

export const UiContext = React.createContext(initialUiContext);
