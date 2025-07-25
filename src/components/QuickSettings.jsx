import React, { useEffect, useRef } from "react";

const QuickSettings = ({ onClose, brightness, setBrightness, volume, setVolume }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Update CSS brightness
  useEffect(() => {
    document.body.style.filter = `brightness(${brightness}%)`;
  }, [brightness]);

  return (
    <div
      ref={panelRef}
      className="absolute bottom-14 right-36 w-96 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 rounded-xl p-4 text-white shadow-2xl backdrop-blur-md animate-slide-fade-in z-50"
    >
      {/* Top toggles */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {["Wi-Fi", "Bluetooth", "Airplane mode", "Rotation lock", "Energy saver", "Accessibility"].map((label, i) => (
          <div
            key={label}
            className={`rounded-md py-2 px-3 flex items-center justify-center text-center border border-white/10 ${
              i < 2 ? "bg-blue-600 text-white" : "bg-zinc-700 text-zinc-300"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Sliders */}
      <div className="mt-4 space-y-4">
        {/* Brightness */}
        <div>
          <label className="text-xs text-zinc-400">Brightness</label>
          <input
            type="range"
            min="30"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full mt-1"
          />
        </div>

        {/* Volume */}
        <div>
          <label className="text-xs text-zinc-400">Volume</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickSettings;
