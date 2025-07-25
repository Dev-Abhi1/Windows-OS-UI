import React from "react";

const ThisPC = () => {
  const drives = [
    {
      name: "Windows-SSD (C:)",
      free: "190 GB",
      total: "425 GB",
      icon: "/assets/icons/unlockwindows.ico",
    },
    {
      name: "New Volume (D:)",
      free: "48.5 GB",
      total: "48.8 GB",
      icon: "/assets/icons/unlock.ico",
    },
  ];

  const sidebarItems = [
    "Desktop",
    "Downloads",
    "Documents",
    "Pictures",
    "Music",
    "Videos",
    "cap edit",
    "Screenshots",
    "Captures",
    "This PC",
    "Windows-SSD (C:)",
    "New Volume (D:)",
    "Network",
    "Linux",
  ];

  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-white font-sans">
      {/* Sidebar */}
      <div className="w-52 border-r border-zinc-700 px-2 py-3 space-y-1 text-sm">
        {sidebarItems.map((item, i) => (
          <div
            key={i}
            className="text-zinc-300 px-3 py-1 rounded hover:bg-zinc-700 cursor-default"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-lg mb-4 font-semibold">Devices and drives</h2>
        <div className="flex gap-6">
          {drives.map((drive, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-md w-60 shadow-lg hover:shadow-xl transition-all"
            >
              <img src={drive.icon} alt="drive" className="w-12 h-12 mb-2" />
              <p className="text-sm font-medium text-zinc-100 mb-1">{drive.name}</p>
              <div className="w-full h-2 rounded bg-zinc-600 mb-1">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${
                    (parseFloat(drive.free) / parseFloat(drive.total)) * 100
                  }%` }}
                ></div>
              </div>
              <p className="text-xs text-zinc-400">
                {drive.free} free of {drive.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="w-72 border-l border-zinc-700 p-4 hidden xl:block">
        <div className="flex flex-col items-center">
          <img
            src="/assets/icons/monitor.ico"
            className="w-16 h-16 mb-4"
            alt="PC"
          />
          <h3 className="text-md font-light mb-2">This PC (2 items)</h3>
          <p className="text-xs text-zinc-400 text-center">
            Select a single file to get more information and share your cloud content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThisPC;
