'use client';
import React, { useState } from 'react';

interface CookingMethodTabsProps {
  methods: {
    nama: string;
    langkah: string[];
  }[];
}

const CookingMethodTabs: React.FC<CookingMethodTabsProps> = ({ methods }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMethod = methods[activeIndex];

  return (
    <div>
      <div className='flex items-center gap-2 mt-5 mb-2'>
        <h2 className='font-display text-base text-ink'>Cara Memasak</h2>
        <div className='flex-1 border-b-2 border-dashed border-paper-shadow' />
      </div>

      <div>
        <div className='flex gap-2 mb-3'>
          {methods.map((method, index) => (
            <button
              key={method.nama}
              onClick={() => setActiveIndex(index)}
              className={`text-sm px-3 py-1.5 border-2 border-ink wobble-d cursor-pointer ${
                index === activeIndex
                  ? 'bg-ink text-paper'
                  : 'bg-white text-ink'
              }`}
            >
              {method.nama}
            </button>
          ))}
        </div>

        <div>
          {activeMethod.langkah.map((step, index) => (
            <ul key={index} className='ml-5'>
              <li className='list-disc'>{step}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookingMethodTabs;
