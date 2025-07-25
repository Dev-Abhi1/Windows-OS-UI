import React, { useEffect, useState } from "react";
import SystemTray from "../../components/SystemTray";
import { useDispatch, useSelector } from "react-redux";
import {
  hideContextMenu,
  showContextMenu,
} from "../contextMenu/contextMenuSlice";
import ContextMenuTray from "../contextMenu/ContextMenuTray";
import DesktopIconi from "../../components/DesktopIconi";
import Window from "../../components/Window";
import DraggableFolder from "./DraggableFolder";

const Desktop = () => {
  const deskTopIcons = [
    {
      title: "This PC",
      icon: "./assets/icons/monitor.ico",
      appType: "explorer",
    },
    {
      title: "Recycle Bin",
      icon: "./assets/icons/recyclebinfull.ico",
      appType: "trash",
    },
    {
      title: "Google Chrome",
      icon: "./assets/icons/icons8-chrome.svg",
      appType: "chrome",
    },
    {
      title: "VS Code",
      icon: "./assets/icons/icons8-vs-code.svg",
      appType: "vscode",
    },
    {
      title: "Notepad",
      icon: "./assets/icons/notepad.ico",
      appType: "notepad",
    },
  ];

  const dispatch = useDispatch();
  const contextMenu = useSelector((state) => state.contextMenu);
  const openWindows = useSelector((state) => state.windows.openWindows);
  const desktopItems = useSelector((state) => state.desktop.items);
  const currentWallpaperIndex = useSelector((state) => state.desktop.currentWallpaperIndex);
  const wallpapers = useSelector((state) => state.desktop.wallpapers);

  const [refreshing, setRefreshing] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(showContextMenu({ x: e.pageX, y: e.pageY }));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 50); // 150ms blink
  };

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.visible) dispatch(hideContextMenu());
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [contextMenu.visible]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`relative w-full overflow-hidden h-screen pt-[0.1px] bg-cover bg-center transition-opacity duration-150 ${
        refreshing ? "opacity-50" : "opacity-100"
      }`}
      style={{
        backgroundImage: `url(${wallpapers[currentWallpaperIndex]})`,
      }}
    >
      {contextMenu.visible && (
        <div
          className="absolute z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={() => dispatch(hideContextMenu())}
        >
          <ContextMenuTray onRefresh={handleRefresh} />
        </div>
      )}

      {deskTopIcons.map((icon, i) => (
        <DesktopIconi key={i} {...icon} />
      ))}

      {desktopItems.map((item) => (
        <DraggableFolder key={item.id} item={item} />
      ))}

      {openWindows
        .filter((win) => !win.minimized)
        .map((win) => (
          <Window key={win.id} windowData={win} />
        ))}

      <div className="w-full absolute bottom-0">
        <SystemTray />
      </div>
    </div>
  );
};

export default Desktop;
