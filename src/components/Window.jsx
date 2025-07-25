import { useDispatch } from "react-redux";
import {
  closeWindow,
  focusWindow,
  minimizeWindow,
  updateWindowPosition,
} from "../features/windows/windowsSlice";
import { useState, useEffect } from "react";
import ThisPC from "../features/apps/explorer/ThisPC";
import RecycleBin from "../features/apps/explorer/RecycleBin";

const Window = ({ windowData }) => {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleFocus = () => {
    dispatch(focusWindow(windowData.id));
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - offset.x;
    const deltaY = e.clientY - offset.y;

    const newX = (windowData.position?.x || 0) + deltaX;
    const newY = (windowData.position?.y || 0) + deltaY;

    dispatch(updateWindowPosition({ id: windowData.id, x: newX, y: newY }));
    setOffset({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(
        searchQuery
      )}&format=json&pretty=1`
    );
    const data = await response.json();
    setResults(data.RelatedTopics || []);
  };

  const isExplorerWindow =
    windowData.appType === "explorer" && windowData.title === "This PC";
  const isTrashWindow = windowData.appType === "trash";

  return (
    <div
      className="fixed bg-white border shadow-md"
      style={{
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 107px)",
        zIndex: windowData.zIndex,
      }}
      onMouseDown={handleFocus}
    >
      <div
        className="flex justify-between items-center bg-gray-800 text-white p-2"
        onMouseDown={handleMouseDown}
      >
        <span>{windowData.title}</span>
        <div className="flex gap-2 items-center">
          <button
            className="hover:bg-white/15 px-5 py-2"
            onClick={() => dispatch(minimizeWindow(windowData.id))}
          >
            __
          </button>
          <button
            className="hover:bg-red-500 text-white px-5 py-2"
            onClick={() => dispatch(closeWindow(windowData.id))}
          >
            X
          </button>
        </div>
      </div>

      <div className="p-0 text-black w-full h-full overflow-auto">
        {windowData.appType === "notepad" && (
          <textarea className="w-full h-full border" />
        )}
        {isTrashWindow && <RecycleBin />}

        {windowData.appType === "chrome" && (
          <div className="flex flex-col h-full">
            <div className="flex items-center p-2 border-b bg-gray-100">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search with DuckDuckGo"
                className="flex-1 px-3 py-1 border rounded-md text-sm"
              />
              <button
                className="ml-2 px-4 py-1 bg-blue-500 text-white rounded text-sm"
                onClick={handleSearch}
              >
                Go
              </button>
            </div>
            <div className="flex-1 w-full overflow-y-auto p-4 text-sm">
              {results.length === 0 ? (
                <p className="text-gray-400">Type something and hit enter to search.</p>
              ) : (
                <ul className="space-y-3">
                  {results.map((item, index) => (
                    <li key={index}>
                      {item.Text && (
                        <div>
                          <a
                            href={item.FirstURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline"
                          >
                            {item.Text}
                          </a>
                        </div>
                      )}
                      {item.Topics &&
                        item.Topics.map((sub, i) => (
                          <div key={i}>
                            <a
                              href={sub.FirstURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 underline"
                            >
                              {sub.Text}
                            </a>
                          </div>
                        ))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {windowData.appType === "vscode" && (
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-14 bg-gray-800 text-white flex flex-col items-center py-2 space-y-4">
              <i className="fi fi-rr-file"></i>
              <i className="fi fi-rr-search"></i>
              <i className="fi fi-rr-git"></i>
              <i className="fi fi-rr-play"></i>
              <i className="fi fi-rr-box"></i>
            </div>
            {/* Main content */}
            <div className="flex-1 bg-gray-900 text-white p-6 overflow-y-auto">
              <h1 className="text-2xl mb-6">Visual Studio Code</h1>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Start</h2>
                <ul className="space-y-1 text-blue-400">
                  <li>📄 New File...</li>
                  <li>📂 Open File...</li>
                  <li>📁 Open Folder...</li>
                  <li>🔗 Clone Git Repository...</li>
                  <li>🔌 Connect to...</li>
                </ul>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Recent</h2>
                <ul className="space-y-1 text-blue-300 underline">
                  <li>copy os - C:\Users\rooh\Desktop\WEB-DEV\cohort projects</li>
                  <li>day2 - C:\Users\rooh\Desktop\WEB-DEV\sheryians coding school\2. Back</li>
                  <li>4. React OS Clone Project</li>
                  <li>day1 - C:\Users\rooh\Desktop\WEB-DEV\cohort projects</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Walkthroughs</h2>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-4 rounded">Get started with VS Code</div>
                  <div className="bg-gray-800 p-4 rounded">Learn the Fundamentals</div>
                  <div className="bg-gray-800 p-4 rounded">Get Started with Python Development</div>
                  <div className="bg-gray-800 p-4 rounded">Get Started with Java Development</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isExplorerWindow && <ThisPC />}
      </div>
    </div>
  );
};

export default Window;



