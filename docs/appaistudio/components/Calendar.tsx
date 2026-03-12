import React, { useState } from 'react';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  availableDays: number[];
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, availableDays }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025
  const [selectedDay, setSelectedDay] = useState<number | null>(27);

  const handleDayClick = (day: number) => {
    if (availableDays.includes(day)) {
      setSelectedDay(day);
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      onDateSelect(selectedDate);
    }
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const months = ["Jan", "Fev", "Abr", "Mai", "Jun", "Jul"]; // Example months

  return (
    <div className="p-4">
      <div className="flex justify-around mb-4 text-gray-600 dark:text-gray-400">
        {months.map((m) => (
            <button key={m} className={`px-3 py-1 text-sm rounded-full ${m === "Jul" ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                {m}
            </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {monthDays.map(day => {
          const isAvailable = availableDays.includes(day);
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={!isAvailable}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors
                ${!isAvailable ? 'text-gray-400 dark:text-gray-600' : ''}
                ${isAvailable && !isSelected ? 'text-gray-800 dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500' : ''}
                ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-400' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Disponível</span>
        </div>
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Indisponível</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;