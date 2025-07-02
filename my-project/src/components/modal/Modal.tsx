// components/ui/Modal.tsx
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  children?: React.ReactNode;
   // Optional close handler
};

const Modal: React.FC<ModalProps> = ({ isOpen,children, }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-purple-400"
          >
             
              {children}
            
            
           
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
