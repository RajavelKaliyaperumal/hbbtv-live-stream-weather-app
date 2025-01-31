import React from "react";
import '../styles/ErrorModel.css';

interface ErrorModalProps {
  message: string | null;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message }) => {
  if (!message) return null; // Don't render modal if no message is passed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
