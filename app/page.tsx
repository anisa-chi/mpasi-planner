import Header from '@/components/Header';
import WeeklyPlanClient from '@/components/WeeklyPlanClient';
import { getMonday } from '@/lib/date';
import { getAllRecipes } from '@/lib/recipes';
import { fetchWeekDays } from '@/lib/weekly-plan';

export default async function Home() {
	const recipes = getAllRecipes();
	const weekStart = getMonday(new Date()).toISOString().split('T')[0];
	const initialDays = await fetchWeekDays(weekStart, recipes);

	return (
		<>
			<Header leftIcon='menu' />

			<div className='mt-16'>
				<WeeklyPlanClient
					recipes={recipes}
					initialDays={initialDays}
					initialWeekStart={weekStart}
				/>
			</div>
		</>
	);
}
