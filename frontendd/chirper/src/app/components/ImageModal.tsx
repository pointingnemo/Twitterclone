import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imgSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>
        <img src={imgSrc} alt="Post Image" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default ImageModal;
