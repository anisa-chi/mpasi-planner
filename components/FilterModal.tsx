import React from 'react';
import FilterChip from './FilterChip';
import { X } from 'lucide-react';

interface FilterModalProps {
	activeFilter: string[];
	onToggleFilter: (filter: string) => void;
	onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
	activeFilter,
	onToggleFilter,
	onClose,
}) => {
	const AGE_OPTIONS = ['6-8bln', '9-11bln', '12-23bln', '2-5thn'];
	const MENU_OPTIONS = ['Menu Utama', 'Snack'];
	return (
		<div className='bg-ink/30 fixed top-0 left-0 right-0 bottom-0 z-40'>
			<div className='absolute bottom-0 left-0 right-0 bg-paper p-3 border-2 border-ink rounded-t-lg'>
				<div className='w-full flex'>
					<button onClick={onClose} className='ml-auto'>
						<X width={16} strokeWidth={2.5} className='text-ink' />
					</button>
				</div>

				<div>
					<div className='flex items-center gap-2 mb-2'>
						<h2 className='font-display text-base text-ink'>Umur</h2>
						<div className='flex-1 border-b-2 border-dashed border-paper-shadow' />
					</div>

					<div className='flex gap-2'>
						{AGE_OPTIONS.map((age) => (
							<FilterChip
								key={age}
								filter={age}
								isActive={activeFilter.includes(age)}
								onClick={() => onToggleFilter(age)}
							/>
						))}
					</div>
				</div>

				<div>
					<div className='flex items-center gap-2 mt-5 mb-2'>
						<h2 className='font-display text-base text-ink'>Jenis Resep</h2>
						<div className='flex-1 border-b-2 border-dashed border-paper-shadow' />
					</div>

					<div className='flex gap-2'>
						{MENU_OPTIONS.map((menu) => (
							<FilterChip
								key={menu}
								filter={menu}
								isActive={activeFilter.includes(menu)}
								onClick={() => onToggleFilter(menu)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterModal;
