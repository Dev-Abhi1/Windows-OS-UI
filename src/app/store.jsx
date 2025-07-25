import { configureStore } from '@reduxjs/toolkit'
import contextMenuReducer from "../features/contextMenu/contextMenuSlice"
import windowsReducer from "../features/windows/windowsSlice"
import desktopSlice from "../features/desktop/desktopSlice"
export const store = configureStore({
  reducer: {
    contextMenu:contextMenuReducer,
    windows:windowsReducer,
    desktop:desktopSlice
  },
})