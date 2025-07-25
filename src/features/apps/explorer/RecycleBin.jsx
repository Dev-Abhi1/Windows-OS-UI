const RecycleBin = () => {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white flex">
      {/* Sidebar */}
      <div className="w-[200px] bg-[#121212] border-r border-[#2a2a2a] p-2">
        <div className="text-sm mb-2 font-semibold">Navigation</div>
        <ul className="text-xs space-y-1">
          <li className="p-1 hover:bg-white/10 rounded">Home</li>
          <li className="p-1 hover:bg-white/10 rounded">Gallery</li>
          <li className="p-1 hover:bg-white/10 rounded">Desktop</li>
          <li className="p-1 hover:bg-white/10 rounded">Downloads</li>
          <li className="p-1 hover:bg-white/10 rounded">Documents</li>
          <li className="p-1 hover:bg-white/10 rounded">Pictures</li>
          <li className="p-1 hover:bg-white/10 rounded">Music</li>
          <li className="p-1 hover:bg-white/10 rounded">Videos</li>
          <li className="p-1 hover:bg-white/10 rounded">This PC</li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-300">This folder is empty.</p>
        </div>

        {/* Info Panel */}
        <div className="w-[250px] bg-[#1a1a1a] border-l border-[#2a2a2a] p-4 flex flex-col items-center justify-center text-center">
          <img
           src ="/assets/icons/recyclebinfull.ico"
            alt="recycle"
            className="w-20 mb-4"
          />
          <h1 className="text-base font-semibold">Recycle Bin (0 items)</h1>
          <p className="text-xs mt-2 text-gray-400">
            Select a single file to get more information and share your cloud
            content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecycleBin;
