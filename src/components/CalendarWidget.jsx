// src/components/CalendarWidget.jsx
import React from "react";

const CalendarWidget = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const day = date.getDate();
  const weekday = date.toLocaleString("default", { weekday: "long" });

  return (
    <div className="absolute right-4 bottom-16 z-[999] w-72 rounded-xl backdrop-blur-xl bg-black/40 text-white shadow-2xl p-4">
      <div className="text-lg font-medium mb-2">{`${weekday}, ${day} ${month}`}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-zinc-300">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="font-semibold text-zinc-400">
            {d}
          </div>
        ))}
        {Array.from({ length: new Date(year, new Date().getMonth(), 1).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: new Date(year, new Date().getMonth() + 1, 0).getDate() }).map(
          (_, i) => (
            <div
              key={i}
              className={`rounded-full ${
                i + 1 === day ? "bg-white text-black font-bold" : ""
              }`}
            >
              {i + 1}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
