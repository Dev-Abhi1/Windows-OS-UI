import { useDispatch } from "react-redux";
import { addFolder } from "../desktop/desktopSlice";
import { changeWallpaper } from "../desktop/desktopSlice";

const ContextMenuTray = ({ onRefresh }) => {
  const dispatch = useDispatch();

  const handleNewFolder = () => {
    dispatch(addFolder());
  };

  return (
    <div className="cursor-default w-40 flex items-center h-42 rounded-lg bg-white/5 backdrop-blur-xl backdrop-brightness-90 backdrop-contrast-80 backdrop-grayscale-20 backdrop-invert-2 shadow-xl text-sm font-sans">
      <ul className="m-0 p-0 text-white font-thin">
        
        
        <li
          onClick={onRefresh}
          className="flex items-center gap-3 px-4 py-2 hover:bg-white/20"
        >
          <img className="w-4 h-4" src ="/assets/icons/icons8-refresh.svg" alt="" />
          <span>Refresh</span>
        </li>

        <hr className="opacity-50 text-[#dadada]" />

       
        <li
          onClick={handleNewFolder}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/20"
        >
          <img className="w-5 h-5" src ="/assets/icons/folder.ico" alt="" />
          <span>Create Folder</span>
        </li>

        <hr className="opacity-50 text-[#dadada]" />

        
        <li
          onClick={() => dispatch(changeWallpaper())}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/20"
        >
          <img className="w-4 h-4" src ="/assets/icons/desktop.ico" alt="" />
          <span className="whitespace-nowrap">Change Wallpaper</span>
        </li>

        <hr className="opacity-50 text-[#dadada]" />

        
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-white/20">
          <img className="w-4 h-4"src ="/assets/icons/Windows_Terminal_logo.svg" alt="" />
          <span>Open Terminal</span>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenuTray;
