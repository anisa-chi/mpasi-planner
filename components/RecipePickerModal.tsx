'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import SearchBar from './SearchBar';
import FilterChip from './FilterChip';
import { X } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import Image from 'next/image';

interface RecipePickerModalProps {
	recipes: Recipe[];
	dayName: string;
	onClose: () => void;
	onPick: (recipe: Recipe) => void;
}

const RecipePickerModal: React.FC<RecipePickerModalProps> = ({
	recipes,
	dayName,
	onClose,
	onPick,
}) => {
	const [query, setQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState<string[]>([]);

	const filterOptions = ['Menu Utama', 'Snack'];

	const toggleFilter = (filter: string) => {
		if (activeFilter.includes(filter)) {
			setActiveFilter(activeFilter.filter((f) => f !== filter));
		} else {
			setActiveFilter([...activeFilter, filter]);
		}
	};

	const filteredRecipes = recipes.filter((recipe) => {
		const matchesSearch = recipe.nama
			.toLocaleLowerCase()
			.includes(query.toLocaleLowerCase());
		const matchesFilter =
			activeFilter.length === 0 ||
			activeFilter.some((f) => recipe.kategori_menu === f);
		return matchesSearch && matchesFilter;
	});

	return (
		<>
			<div className='fixed z-40 bottom-0 top-0 left-0 right-0 bg-ink/30' />
			<motion.div
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ type: 'spring', damping: 30, stiffness: 300 }}
				className='fixed bottom-0 top-1/4 left-0 right-0 z-50 p-3 border-2 border-ink rounded-t-xl bg-paper flex flex-col overflow-hidden'
			>
				<div className='flex justify-around items-center shrink-0'>
					<p className='text-lg mb-2'>
						Pilih Resep - <span>{dayName}</span>
					</p>
					<button className='ml-auto cursor-pointer' onClick={onClose}>
						<X size={18} strokeWidth={2.5} className='text-ink' />
					</button>
				</div>

				<div className='mb-2 shrink-0'>
					<SearchBar value={query} onChange={setQuery} />
				</div>

				<div className='flex gap-2 mb-2 shrink-0'>
					{filterOptions.map((option) => (
						<FilterChip
							key={option}
							filter={option}
							isActive={activeFilter.includes(option)}
							onClick={() => toggleFilter(option)}
						/>
					))}
				</div>

				<div className='pt-3 flex flex-col gap-2 overflow-y-auto flex-1 min-h-0'>
					{filteredRecipes.map((recipe) => (
						<button
							key={recipe.id}
							onClick={() => onPick(recipe)}
							className='w-full p-3 flex items-center gap-2 border-2 border-ink wobble-c cursor-pointer'
						>
							<div className='relative w-9 h-9 rounded-md overflow-hidden shrink-0'>
								<Image
									src={`/recipes/${recipe.foto}`}
									alt={recipe.nama}
									fill
									sizes='36px'
									className='object-cover'
								/>
							</div>

							<div className='flex flex-col justify-center items-start'>
								<p>{recipe.nama}</p>
								<p className='text-sm text-ink/60'>{recipe.kategori_menu}</p>
							</div>
						</button>
					))}
				</div>
			</motion.div>
		</>
	);
};

export default RecipePickerModal;
