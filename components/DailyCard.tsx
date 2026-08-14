import { MiniRecipe } from '@/types/recipe';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import RecipeMiniCard from './RecipeMiniCard';

interface DailyCardProps {
	dayName: string;
	date: string;
	isToday: boolean;
	menuUtama: MiniRecipe[];
	snack: MiniRecipe[];
	onAddClick: () => void;
	onRemoveRecipe: (section: 'menuUtama' | 'snack', id: string) => void;
}

const DailyCard: React.FC<DailyCardProps> = ({
	dayName,
	date,
	isToday,
	menuUtama,
	snack,
	onAddClick,
	onRemoveRecipe,
}) => {
	return (
		<>
			<div className='mt-2 w-full pb-3 border-b border-dashed border-ink/60'>
				<div className='flex justify-around items-end'>
					<div className='flex gap-2 items-center justify-center'>
						<div
							className={`font-display text-lg ${
								isToday ? 'bg-red/60 px-3 wobble-a' : 'bg-paper'
							}`}
						>
							{dayName}
						</div>
						<div className='text-sm text-ink/60'>{date}</div>
					</div>
					<button className='ml-auto doodle-icon' onClick={onAddClick}>
						<Plus size={16} strokeWidth={2.5} className='text-ink' />
					</button>
				</div>

				<div className='w-full'>
					<RecipeMiniCard
						title='Menu Utama'
						menus={menuUtama}
						onRemove={(id) => onRemoveRecipe('menuUtama', id)}
					/>
				</div>

				<div className='w-full'>
					<RecipeMiniCard
						title='Snack'
						menus={snack}
						onRemove={(id) => onRemoveRecipe('snack', id)}
					/>
				</div>
			</div>
		</>
	);
};

export default DailyCard;
