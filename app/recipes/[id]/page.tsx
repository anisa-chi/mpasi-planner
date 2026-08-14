import CookingMethodTabs from '@/components/CookingMethodTabs';
import Header from '@/components/Header';
import IngredientsList from '@/components/IngredientsList';
import NotesSection from '@/components/NotesSection';
import NutritionCard from '@/components/NutritionCard';
import RecipeCover from '@/components/RecipeCover';
import RecipeMeta from '@/components/RecipeMeta';
import { getRecipeById } from '@/lib/recipes';
import { supabase } from '@/lib/supabase';

interface RecipeDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({
	params,
}: RecipeDetailPageProps) {
	const { id } = await params;
	const recipe = getRecipeById(id);

	const { data: notes, error: errorNotes } = await supabase
		.from('recipe_notes')
		.select('*')
		.eq('recipe_id', id)
		.order('created_at', { ascending: false });

	const { data: label, error: errorLabel } = await supabase
		.from('recipe_labels')
		.select('*')
		.eq('recipe_id', id)
		.order('created_at', { ascending: false });

	return (
		<>
			<Header leftIcon='back' />

			<div className='relative mt-16 p-4'>
				<RecipeCover cover={recipe.foto} />

				<h1 className='mt-4 text-xl font-display'>{recipe.nama}</h1>

				<RecipeMeta
					recipeId={recipe.id}
					recipeName={recipe.nama}
					jenisMenu={recipe.kategori_menu}
					kategoriUmur={recipe.kategori_umur}
					alergen={recipe.alergen}
					label={label ?? []}
				/>

				<NutritionCard nutrition={recipe.gizi} />

				<IngredientsList portion={recipe.porsi} ingredients={recipe.bahan} />

				<CookingMethodTabs methods={recipe.metode_masak} />

				<NotesSection recipeId={id} initialNotes={notes ?? []} />
			</div>
		</>
	);
}
