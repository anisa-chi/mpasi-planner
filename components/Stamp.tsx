import React from 'react';

interface StampProps {
  text: string;
  varian: 'suka' | 'tidak suka' | 'belum';
}

const Stamp: React.FC<StampProps> = ({ text, varian }) => {
  return (
    <span
      className={`${
        varian === 'suka'
          ? 'text-green rotate-[-1.5deg]'
          : varian === 'tidak suka'
          ? 'text-red rotate-[1.5deg]'
          : 'text-yellow rotate-[1.3deg]'
      } text-xs border-2 border-current px-3 py-1 font-body font-semibold rounded-[40%_60%_55%_45%/50%_45%_55%_50%] inline-block`}
    >
      {text}
    </span>
  );
};

export default Stamp;
