import React, { useState, useEffect, useRef } from 'react'

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Get all focusable elements within the modal
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the close button when modal opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Escape key and outside click handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Return focus to the trigger button
    if (openButtonRef.current) {
      openButtonRef.current.focus();
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex justify-center items-center p-4'>
      <div>
        <button 
          ref={openButtonRef}
          className='cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-purple-300' 
          onClick={openModal}
        >
          ✨ Show Modal
        </button>
      </div>

      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center p-4 z-50 animate-in fade-in duration-300' style={{backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
          <div 
            ref={modalRef}
            className='bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300 ease-out'
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl'>
              <h2 id="modal-title" className='text-2xl font-bold text-center'>
                🎉 Welcome!
              </h2>
            </div>

            {/* Content */}
            <div className='p-8 text-center'>
              <div className='mb-6'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-3xl'>🚀</span>
                </div>
                <p className='text-gray-700 text-lg leading-relaxed'>
                  You've opened a beautiful modal with all the accessibility features you need!
                </p>
              </div>

              <div className='text-sm text-gray-500 mb-6 bg-gray-50 p-4 rounded-lg'>
                <p className='font-medium mb-2'>Features included:</p>
                <div className='space-y-1 text-left'>
                  <p>• 🔒 Focus trap (try pressing Tab)</p>
                  <p>• 🖱️ Click outside to close</p>
                  <p>• ⌨️ Press Escape to close</p>
                  <p>• ♿ Screen reader friendly</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className='flex gap-3 justify-center'>
                <button 
                  className='cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300'
                  onClick={closeModal}
                >
                  Maybe Later
                </button>
                <button 
                  ref={closeButtonRef}
                  className='cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300'
                  onClick={closeModal}
                >
                  Awesome! Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}