import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFolderPosition } from "./desktopSlice";

const DraggableFolder = ({ item }) => {
  const dispatch = useDispatch();
  const folderRef = useRef(null);
  const [position, setPosition] = useState(item.position);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    e.preventDefault();

    const rect = folderRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    setPosition({ x: newX, y: newY });
  };

  const onMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      dispatch(updateFolderPosition({ id: item.id, position }));
    }
  };

  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, offset, position]);

  return (
    <div
      ref={folderRef}
      className="absolute flex flex-col items-center select-none cursor-pointer"
      style={{
        top: position.y,
        left: position.x,
      }}
      onMouseDown={onMouseDown}
    >
      <img
      src="/assets/icons/folder.ico"
        className="w-12 pt-4"
        alt=""
        draggable={false}
      />
      <p className="text-white pb-4 text-center text-sm">{item.name}</p>
    </div>
  );
};

export default DraggableFolder;
