// File: components/Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // 1. Backdrop (Layar Gelap Transparan)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      
      {/* 2. Container Modal */}
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col border border-slate-600 animate-in fade-in zoom-in duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center bg-slate-800 text-white p-4 rounded-t-lg border-b-4 border-orange-500">
          <h2 className="text-lg font-bold tracking-wide uppercase">{title}</h2>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-1 rounded transition-colors"
          >
            ✕ Tutup
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="overflow-auto p-4 bg-gray-100 flex-1">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;