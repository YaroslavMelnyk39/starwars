import React from 'react';
import DarthIcon from './darth.svg';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900">
        <img src={DarthIcon} alt="darth icon" />
    </div>
  </div>
);

export default Spinner;
