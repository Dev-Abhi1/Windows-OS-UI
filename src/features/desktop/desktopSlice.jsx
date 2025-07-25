import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  items: [], 
   currentWallpaperIndex: 0, // NEW
  wallpapers: [
    "/assets/window-bg/win-1.jpg",
    "/assets/window-bg/win-2.jpg",
    "/assets/window-bg/win-3.jpg",
    "/assets/window-bg/win-4.jpg",
    "/assets/window-bg/win-5.jpg",
    "/assets/window-bg/win-6.jpg",
    "/assets/window-bg/win-7.jpg",
    
  ],
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    addFolder: (state) => {
      state.items.push({
        id: nanoid(),
        name: "New Folder",
        position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      });
    },
  
    updateFolderPosition: (state, action) => {
      const { id, position } = action.payload;
      const folder = state.items.find((item) => item.id === id);
      if (folder) {
        folder.position = position;
      }
    },
     changeWallpaper: (state) => {
      state.currentWallpaperIndex =
        (state.currentWallpaperIndex + 1) % state.wallpapers.length;
    },
  },
});

export const { addFolder, updateFolderPosition,changeWallpaper } = desktopSlice.actions;
export default desktopSlice.reducer;
