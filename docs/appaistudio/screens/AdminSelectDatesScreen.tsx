import React, { useState } from 'react';
import Header from '../components/Header';
import { FlightDeal } from '../types';

interface AdminSelectDatesScreenProps {
  emissionData: Partial<FlightDeal>;
  onBack: () => void;
  onConfirm: (type: 'emission' | 'promotion', title: string) => void;
}

const YearCalendar: React.FC<{ selectedDates: Date[], onToggleDate: (date: Date) => void }> = ({ selectedDates, onToggleDate }) => {
    const year = 2025;
    const months = Array.from({ length: 12 }, (_, i) => i);

    const isDateSelected = (date: Date) => {
        return selectedDates.some(d => d.getTime() === date.getTime());
    }

    return (
        <div className="space-y-6">
            {months.map(monthIndex => {
                const monthName = new Date(year, monthIndex).toLocaleString('pt-BR', { month: 'long' });
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
                const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                return (
                    <div key={monthIndex}>
                        <h4 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-3 capitalize">{monthName}</h4>
                        <div className="grid grid-cols-7 gap-1 text-center">
                             {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                             {monthDays.map(day => {
                                 const date = new Date(year, monthIndex, day);
                                 const isSelected = isDateSelected(date);
                                 return (
                                     <button
                                         key={day}
                                         onClick={() => onToggleDate(date)}
                                         className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors text-gray-800 dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500
                                             ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-400' : ''}
                                         `}
                                     >
                                         {day}
                                     </button>
                                 )
                             })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const AdminSelectDatesScreen: React.FC<AdminSelectDatesScreenProps> = ({ emissionData, onBack, onConfirm }) => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const toggleDate = (date: Date) => {
        setSelectedDates(prev => {
            if (prev.some(d => d.getTime() === date.getTime())) {
                return prev.filter(d => d.getTime() !== date.getTime());
            }
            return [...prev, date];
        });
    };

    const handleConfirm = () => {
        if (selectedDates.length > 0) {
            console.log("Confirmed emission with dates:", { ...emissionData, availableDates: selectedDates });
            onConfirm('emission', `${emissionData.from} -> ${emissionData.to}`);
        } else {
            alert('Selecione pelo menos uma data.');
        }
    };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Selecionar Datas Disponíveis" onBack={onBack} />
      <div className="flex-grow p-4 overflow-y-auto">
        <YearCalendar selectedDates={selectedDates} onToggleDate={toggleDate} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button onClick={handleConfirm} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors">
            Confirmar e Adicionar Emissão ({selectedDates.length} {selectedDates.length === 1 ? 'data' : 'datas'})
        </button>
      </div>
    </div>
  );
};

export default AdminSelectDatesScreen;