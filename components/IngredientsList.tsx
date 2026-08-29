import React from 'react';

interface IngredientsListProps {
	portion: string;
	ingredients: { nama: string; jumlah: string }[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ portion, ingredients }) => {
	return (
		<div>
			<div className='flex items-center gap-2 mt-5 mb-2'>
				<h2 className='font-display text-base text-ink'>Bahan</h2>
				<p className='text-sm'>(Untuk {portion})</p>
				<div className='flex-1 border-b-2 border-dashed border-paper-shadow' />
			</div>

			<ul className='ml-5'>
				{ingredients.map((ingredient) => (
					<li key={ingredient.nama} className='list-disc'>
						<span className='font-bold'>{ingredient.jumlah}</span>{' '}
						{ingredient.nama}
					</li>
				))}
			</ul>
		</div>
	);
};

export default IngredientsList;
