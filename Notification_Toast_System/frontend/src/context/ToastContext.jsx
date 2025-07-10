import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

    const [toasts , setToasts] = useState([]);

    const addToast = (message , type = 'success') => {

        const id = Date.now();

        setToasts((prev) => [...prev , {id , message , type}]);

        setTimeout(() => removeToast(id) , 3000);

    }

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Render Toasts */}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between px-4 py-3 rounded shadow text-white ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
