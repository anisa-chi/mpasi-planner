import Image from 'next/image';
import React from 'react';
import Stamp from './Stamp';
import Link from 'next/link';

interface RecipeCardProps {
	id: string;
  title: string;
  age: string;
  menu: string;
  cover: string;
  labels: { text: string; varian: 'suka' | 'tidak suka' | 'belum' }[];
  wobbleVariant: 'a' | 'b' | 'c' | 'd';
}

const RecipeCard: React.FC<RecipeCardProps> = ({
	id,
  title,
  age,
  menu,
  cover,
  labels,
  wobbleVariant,
}) => {
  return (
    <Link href={`/recipes/${id}`}
      className={`w-full p-4 border-2 flex items-start gap-4 ${
        wobbleVariant === 'a'
          ? 'wobble-a'
          : wobbleVariant === 'b'
          ? 'wobble-b'
          : wobbleVariant === 'c'
          ? 'wobble-c'
          : 'wobble-d'
      }`}
    >
      <div className='relative w-1/4 aspect-square border-2 rounded-sm -rotate-2'>
        <Image
          src='/washi-tape.webp'
          alt='Washi Tape'
          width={60}
          height={24}
          className='absolute z-10 w-2/3 top-[-15%] left-[10%] rotate-[0.6deg]'
        />
        <Image
          src={`/recipes/${cover}`}
          alt={title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 25vw, 150px'
        />
      </div>
      <div className='flex flex-col w-full'>
        <p className='font-display font-semibold text-lg'>{title}</p>
        <div className='flex gap-1 text-ink/60 text-sm'>
          <span>{age}</span>
          <span>•</span>
          <span>{menu}</span>
        </div>
        <div className='mt-2 flex flex-1 justify-between ml-auto gap-2'>
          {labels.map((label) => (
            <Stamp key={label.text} text={label.text} varian={label.varian} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
