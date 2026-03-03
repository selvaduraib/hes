import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label, placeholder = 'Select date' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onChange(formatDate(newDate));
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const today = new Date();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const renderCalendar = () => {
    const days = [];
    const totalSlots = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - startingDayOfWeek + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = new Date(year, month, dayNumber);
      const isToday = isValidDay && 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const isSelected = isValidDay && selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push(
        <button
          key={i}
          type="button"
          onClick={() => isValidDay && handleDateClick(dayNumber)}
          disabled={!isValidDay}
          className={`
            h-12 w-12 rounded-lg text-base font-medium transition-colors
            ${!isValidDay ? 'invisible' : ''}
            ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
            ${isToday && !isSelected ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
            ${!isSelected && !isToday && isValidDay ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
          `}
        >
          {isValidDay ? dayNumber : ''}
        </button>
      );
    }

    return days;
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={formatDisplayDate(value)}
          onClick={() => setIsOpen(!isOpen)}
          placeholder={placeholder}
          readOnly
          className="w-full px-4 py-3.5 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium"
        />
        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-4 w-full min-w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {monthName}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

