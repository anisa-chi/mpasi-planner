import React from 'react';

interface IngredientsListProps {
  ingredients: string[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mt-5 mb-2'>
        <h2 className='font-display text-base text-ink'>Bahan</h2>
        <div className='flex-1 border-b-2 border-dashed border-paper-shadow' />
      </div>

      <ul className='ml-5'>
        {ingredients.map((ingredient) => (
          <li key={ingredient} className='list-disc'>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
