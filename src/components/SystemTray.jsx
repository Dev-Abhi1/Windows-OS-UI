// /components/SystemTray.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TaskBar from "../features/taskbar/TaskBar";
import { pinnedApps } from "../features/taskbar/taskbarPinnedApps";
import QuickSettings from "./QuickSettings";
import StartMenu from "./StartMenu";

const SystemTray = () => {
  const openWindows = useSelector((state) => state.windows.openWindows);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);

  const calendarRef = useRef(null);
  const quickSettingsRef = useRef(null);
  const startMenuRef = useRef(null);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);
  const toggleQuickSettings = () => setShowQuickSettings((prev) => !prev);
  const toggleStartMenu = () => setShowStartMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !e.target.closest("#clock-toggle")
      ) {
        setShowCalendar(false);
      }
      if (
        quickSettingsRef.current &&
        !quickSettingsRef.current.contains(e.target) &&
        !e.target.closest("#volume-toggle")
      ) {
        setShowQuickSettings(false);
      }
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target) &&
        !e.target.closest("#start-toggle")
      ) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.filter = `brightness(${brightness}%)`;
  }, [brightness]);

  const dynamicApps = openWindows
    .filter(
      (win) =>
        !pinnedApps.some(
          (p) =>
            p.appType === win.appType ||
            (p.relatedApps && p.relatedApps.includes(win.appType))
        )
    )
    .map((win) => ({
      appType: win.appType,
      icon: win.icon,
    }));

  const taskbarApps = [...pinnedApps, ...dynamicApps];

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = now.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-full flex justify-between px-5 h-13 backdrop-blur-2xl backdrop-contrast-90 backdrop-grayscale-70 backdrop-invert-2 relative">
      {/* Weather */}
      <div className="flex items-center gap-2">
        <img src ="/assets/icons/icons8-umbrella-100.png" className="h-8" alt="" />
        <div className="text-white font-extralight">
          <p>Light Raining</p>
          <h3 className="text-xs text-zinc-300">28°C</h3>
        </div>
      </div>

      {/* Start, Search, Taskbar */}
      <div className="h-full p-2.5 flex gap-2.5">
        <div className="h-full p-2.5 flex items-center gap-2.5">
          <img 
            id="start-toggle"
            className="h-8 cursor-pointer"
            src="/assets/icons/start2.ico"
            onClick={toggleStartMenu}
            alt=""
          />
          <div className="flex w-70 h-9 items-center justify-between rounded-2xl shadow-[1px_29px_77px_14px_rgba(0,_0,_0,_0.7)]">
            <div className="flex items-center ml-2 gap-4 p-1">
              <img src ="/assets/icons/search2.ico" className="rotate-280 w-4 h-4" alt="" />
              <p className="text-zinc-300 font-thin">Search</p>
            </div>
            <div className="mr-2 p-2">
              <img src ="/assets/icons/jagannath.webp" className="w-6 h-6" alt="" />
            </div>
          </div>
        </div>

        {/* Taskbar Icons */}
        <div className="flex gap-3.5 items-center">
          {taskbarApps.map((app) => (
            <TaskBar key={app.appType} appType={app.appType} icon={app.icon} />
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="h-full flex items-center gap-2 relative">
        <img src ="/assets/icons/icons8-collapse-arrow-96.png" className="h-5 mr-2" alt="" />
        <img src ="/assets/icons/wifi5.ico" className="h-5" alt="" />
        <img 
          id="volume-toggle"
          src="/assets/icons/icons8-sound-96.png"
          className="h-6 cursor-pointer"
          onClick={toggleQuickSettings}
          alt=""
        />
        <img src ="/assets/icons/icons8-battery-96.png" className="h-6" alt="" />

        {/* Clock */}
        <div
          id="clock-toggle"
          onClick={toggleCalendar}
          className="ml-3 text-white font-thin text-end cursor-pointer"
        >
          <h1>{timeString}</h1>
          <p>{dateString}</p>
        </div>

        {/* Calendar */}
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute bottom-14 right-0 w-72 bg-black bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-4 text-white shadow-2xl animate-fade-in"
          >
            <h2 className="text-sm mb-2 text-center font-light">
              {now.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="grid grid-cols-7 gap-1 text-xs text-zinc-300">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="text-center font-medium text-zinc-400">
                  {d}
                </div>
              ))}
              {Array.from({ length: new Date(now.getFullYear(), now.getMonth(), 1).getDay() }).map(
                (_, i) => <div key={`empty-${i}`} />
              )}
              {Array.from({ length: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() }).map(
                (_, i) => {
                  const day = i + 1;
                  const isToday = day === now.getDate();
                  return (
                    <div
                      key={day}
                      className={`text-center p-1 rounded-full ${
                        isToday ? "bg-blue-600 text-white" : "hover:bg-white/50 hover:bg-opacity-20"
                      }`}
                    >
                      {day}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Quick Settings */}
        {showQuickSettings && (
          <div ref={quickSettingsRef}>
            <QuickSettings
              onClose={() => setShowQuickSettings(false)}
              brightness={brightness}
              setBrightness={setBrightness}
              volume={volume}
              setVolume={setVolume}
            />
          </div>
        )}
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div
          ref={startMenuRef}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up"
        >
          <StartMenu />
        </div>
      )}
    </div>
  );
};

export default SystemTray;
