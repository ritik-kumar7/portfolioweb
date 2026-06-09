import React, { useEffect } from 'react';
import './Notification.css';

export default function Notification({ title, message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-toast theme-dark ${type}`} role="alert">
      <div className="notification-content">
        <div className="notification-status-indicator"></div>
        <div className="notification-text-block">
          <span className="notification-title">{title}</span>
          <p className="notification-message">{message}</p>
        </div>
        <button className="notification-close-btn" onClick={onClose} aria-label="Close alert">
          &times;
        </button>
      </div>
      <div className="notification-progress-bar"></div>
    </div>
  );
}
