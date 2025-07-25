import { createSelector } from 'reselect';

const selectOpenWindows = (state) => state.windows.openWindows;

export const selectMinimizedWindows = createSelector(
  [selectOpenWindows],
  (openWindows) => openWindows.filter(win => win.minimized)
);
