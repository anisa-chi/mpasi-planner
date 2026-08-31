'use client';
import { Recipe } from '@/types/recipe';
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import { Label } from '@/types/label';
import Filter from './Filter';

interface RecipeListClientProps {
	recipes: Recipe[];
	labelsByRecipe: Record<string, Label[]>;
}

const RecipeListClient: React.FC<RecipeListClientProps> = ({
	recipes,
	labelsByRecipe,
}) => {
	const [query, setQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState<string[]>([]);

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
			activeFilter.every(
				(f) => recipe.kategori_umur === f || recipe.kategori_menu === f
			);
		return matchesSearch && matchesFilter;
	});

	const wobbleVariants = ['a', 'b', 'c', 'd'] as const;

	return (
		<>
			<div className='flex gap-2'>
				<SearchBar value={query} onChange={setQuery} />
				<Filter activeFilter={activeFilter} onToggleFilter={toggleFilter} />
			</div>

			{filteredRecipes.map((recipe, index) => (
				<RecipeCard
					key={recipe.id}
					id={recipe.id}
					title={recipe.nama}
					age={recipe.kategori_umur}
					cover={recipe.foto}
					labels={labelsByRecipe[recipe.id] ?? []}
					menu={recipe.kategori_menu}
					wobbleVariant={wobbleVariants[index % wobbleVariants.length]}
				/>
			))}
		</>
	);
};

export default RecipeListClient;
