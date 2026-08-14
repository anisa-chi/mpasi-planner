import Header from '@/components/Header';
import RecipeListClient from '@/components/RecipeListClient';
import { getAllRecipes } from '@/lib/recipes';
import { supabase } from '@/lib/supabase';
import { Label } from '@/types/label';

export default async function RecipeListPage() {
	const recipes = getAllRecipes();

	const { data: allLabels } = await supabase
		.from('recipe_labels')
		.select('recipe_id, text, varian');

	const labelsByRecipe: Record<string, Label[]> = {};

	(allLabels ?? []).forEach((label) => {
		if (!labelsByRecipe[label.recipe_id]) {
			labelsByRecipe[label.recipe_id] = [];
		}
		labelsByRecipe[label.recipe_id].push({
			text: label.text,
			varian: label.varian,
		});
	});

	return (
		<>
			<Header leftIcon='menu' />
			<div className='mt-16 p-3 flex flex-col gap-3'>
				<RecipeListClient recipes={recipes} labelsByRecipe={labelsByRecipe} />
			</div>
		</>
	);
}
