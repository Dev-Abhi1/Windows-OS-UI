import { useDispatch } from "react-redux";
import { openWindow } from "../features/windows/windowsSlice";

// Reusable component
const DesktopIconi = ({ title, icon, appType }) => {
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    dispatch(openWindow({ title, appType }));
  };

  return (
    <div
      className="w-20 flex flex-col  items-center cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      
      <img className="w-12 pt-4" src={icon} alt="" />
      <p className="text-white pb-4 text-center mt-1 text-sm">{title}</p>
    </div>
  );
};
export default DesktopIconi