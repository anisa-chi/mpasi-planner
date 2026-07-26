import CookingMethodTabs from '@/components/CookingMethodTabs';
import Header from '@/components/Header';
import IngredientsList from '@/components/IngredientsList';
import NutritionCard from '@/components/NutritionCard';
import RecipeCover from '@/components/RecipeCover';
import { getRecipeById } from '@/lib/recipes';
import Image from 'next/image';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  return (
    <>
      <Header leftIcon='back' />

      <div className='mt-2 p-4'>
        <RecipeCover cover={recipe.foto} />

        <h1 className='mt-4 text-xl font-display'>{recipe.nama}</h1>

        <div className='mt-2 flex gap-2'>
          <span className='border-2 border-ink px-3 py-1 text-sm wobble-b'>
            {recipe.kategori_menu}
          </span>
          <span className='border-2 border-ink px-3 py-1 text-sm wobble-c'>
            {recipe.kategori_umur}
          </span>
          {recipe.alergen.length !== 0 && (
            <span className='border-2 border-ink px-3 py-1 text-sm wobble-d'>
              {recipe.alergen}
            </span>
          )}
        </div>

        {/* Label */}

        <NutritionCard nutrition={recipe.gizi} />

        <IngredientsList ingredients={recipe.bahan} />

        {/* Cara Memasak */}
        <CookingMethodTabs methods={recipe.metode_masak} />

        {/* Catatan */}
        <div>
          <div className='flex items-center gap-2 mt-5 mb-2'>
            <h2 className='font-display text-base text-ink'>Catatan</h2>
            <div className='flex-1 border-b-2 border-dashed border-paper-shadow' />
          </div>
        </div>
      </div>
    </>
  );
}
