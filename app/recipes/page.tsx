import Header from '@/components/Header';
import RecipeListClient from '@/components/RecipeListClient';
import { getAllRecipes } from '@/lib/recipes';

export default function RecipeListPage() {
  const recipes = getAllRecipes();

  return (
    <>
      <Header leftIcon='menu' />
      <div className='p-3 flex flex-col gap-3'>
        <RecipeListClient recipes={recipes} />
      </div>
    </>
  );
};
