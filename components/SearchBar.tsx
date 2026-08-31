import { FilterIcon, Search } from 'lucide-react';
import React from 'react';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
	return (
		<div className='w-full border-2 border-ink rounded-[12px_8px_18px_6px/8px_18px_6px_12px] px-3 py-2 flex items-center gap-2'>
			<Search width={16} strokeWidth={2.5} className='text-ink' />
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder='Cari resep...'
				className='w-full focus:outline-none text-ink'
			/>
		</div>
	);
};

export default SearchBar;
