

import { useDispatch, useSelector } from "react-redux";
import {
  minimizeWindow,
  restoreWindow,
 
  openWindow,
} from "../windows/windowsSlice";
import { pinnedApps } from "./taskbarPinnedApps";

const TaskBar = ({ appType, icon }) => {
  const dispatch = useDispatch();
  const openWindows = useSelector((state) => state.windows.openWindows);

  const relatedAppTypes = pinnedApps.find(p => p.appType === appType)?.relatedApps || [appType];

  const matchingWindow = openWindows.find(win => relatedAppTypes.includes(win.appType));

  const handleClick = () => {
    if (matchingWindow) {
      if (matchingWindow.minimized) {
        dispatch(restoreWindow(matchingWindow.id));
      } else {
        dispatch(minimizeWindow(matchingWindow.id)); 
      }
    } else {
      dispatch(openWindow({ appType }));
    }
  };

  return (
    <img
      src={icon}
      onClick={handleClick}
      className={`h-7 cursor-pointer ${
        matchingWindow ? "ring-2 ring-white rounded" : ""
      }`}
      alt={appType}
    />
  );
};

export default TaskBar;
