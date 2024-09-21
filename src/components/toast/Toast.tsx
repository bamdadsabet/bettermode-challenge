import React from 'react';
import ToastProps from './types';
import { WarningDiamond } from '@phosphor-icons/react';
import './Toast.scss';

const Toast: React.FC<ToastProps> = ({ error }) => {
  return (
    <div className="toast" role="alert">
      <div className="toast__card">
        <WarningDiamond className="text-white" size={18} />
      </div>
      <div className="toast__massage">{error}</div>
    </div>
  );
};

export default Toast;
