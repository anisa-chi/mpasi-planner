'use client';

import { FilterIcon } from 'lucide-react';
import React, { useState } from 'react';
import FilterModal from './FilterModal';

interface FilterProps {
	activeFilter: string[];
	onToggleFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ activeFilter, onToggleFilter }) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<button
				onClick={() => setOpenModal(true)}
				className='relative p-2 border-2 border-ink rounded-[12px_8px_18px_6px/8px_9px_6px_6px] cursor-pointer'
			>
				<FilterIcon width={16} strokeWidth={2.5} className='text-ink' />

				{activeFilter.length > 0 && (
					<span className='absolute -top-1 right-0 w-5 h-5 rounded-full bg-red text-paper text-sm'>
						{activeFilter.length}
					</span>
				)}
			</button>

			{openModal && (
				<FilterModal
					activeFilter={activeFilter}
					onToggleFilter={onToggleFilter}
					onClose={() => setOpenModal(false)}
				/>
			)}
		</>
	);
};

export default Filter;
