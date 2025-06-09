// components/ui/Modal.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  img: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, description, img }) => {
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
            className="w-full max-w-md bg-lime-100 rounded-2xl shadow-2xl p-8 space-y-6 border border-lime-300"
          >
            <h2 className="text-3xl font-bold text-blue-600 text-center">{title}</h2>
            <p className="text-gray-800 text-base leading-relaxed text-center">{description}</p>
            <div className="flex justify-center">
              <Image
                src={img}
                alt="Modal Image"
                width={400}
                height={300}
                className="rounded-xl shadow-md"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
