'use client';
import { Recipe } from '@/types/recipe';
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import FilterChip from './FilterChip';

interface RecipeListClientProps {
  recipes: Recipe[];
}

const RecipeListClient: React.FC<RecipeListClientProps> = ({ recipes }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string[]>([]);

  const filterOptions = ['6-8bln', '9-11bln', 'Menu Utama', 'Snack'];

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
      <SearchBar value={query} onChange={setQuery} />

      <div className='-mx-4 px-4 flex gap-2 overflow-x-auto pb-1'>
        {filterOptions.map((filter) => (
          <FilterChip
            key={filter}
            filter={filter}
            isActive={activeFilter.includes(filter)}
            onClick={() => toggleFilter(filter)}
          />
        ))}
      </div>

      {filteredRecipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.nama}
          age={recipe.kategori_umur}
          cover={recipe.foto}
          labels={[
            { text: 'Bilal Tidak Suka', varian: 'tidak suka' },
            { text: 'Affan Suka', varian: 'suka' },
          ]}
          menu={recipe.kategori_menu}
          wobbleVariant={wobbleVariants[index % wobbleVariants.length]}
        />
      ))}
    </>
  );
};

export default RecipeListClient;
