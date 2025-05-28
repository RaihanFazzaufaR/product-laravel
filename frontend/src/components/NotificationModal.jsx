import React, { useEffect } from 'react';

function NotificationModal({ message, type, onClose, duration = 3000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  const bgColorClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColorClass = 'text-white';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-600 bg-opacity-75 transition-opacity duration-300"
      onClick={onClose}
      >
      <div
        className={`relative p-6 rounded-lg shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 ${bgColorClass} ${textColorClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold text-center">{message}</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NotificationModal;
