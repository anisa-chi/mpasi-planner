import Image from 'next/image';
import React from 'react';

interface RecipeCoverProps {
  cover: string;
}

const RecipeCover: React.FC<RecipeCoverProps> = ({ cover }) => {
  return (
    <div className='relative w-full aspect-5/3 border-2 border-ink overflow-hidden wobble-a'>
      <Image
        src={`/recipes/${cover}`}
        alt={cover}
        fill
        loading='eager'
        className='object-cover'
        sizes='(max-width: 768px) 100vw, 340px'
      />
    </div>
  );
};

export default RecipeCover;
