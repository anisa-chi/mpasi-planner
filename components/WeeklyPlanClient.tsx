'use client';

import React, { useEffect, useRef, useState } from 'react';
import DailyCard from './DailyCard';
import { MiniRecipe, Recipe } from '@/types/recipe';
import { formatWeekLabel, generateWeekDays, getMonday } from '@/lib/date';
import RecipePickerModal from './RecipePickerModal';
import { DayData, fetchWeekDays } from '@/lib/weekly-plan';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const dummyData: MiniRecipe[] = [
	{
		id: 'bubur-soto-ayam-santan',
		nama: 'Bubur Soto Ayam Santan',
		foto: 'bubur-soto-ayam-santan.jpg',
	},
];

interface WeeklyPlanClientProps {
	recipes: Recipe[];
	initialDays: DayData[];
	initialWeekStart: string;
}

const WeeklyPlanClient: React.FC<WeeklyPlanClientProps> = ({
	recipes,
	initialDays,
	initialWeekStart,
}) => {
	const [days, setDays] = useState<DayData[]>(initialDays);
	const [weekStart, setWeekStart] = useState(initialWeekStart);
	const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);
	const [openPicker, setOpenPicker] = useState(false);

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const loadWeek = async () => {
			const newDays = await fetchWeekDays(weekStart, recipes);
			setDays(newDays);
		};

		loadWeek();
	}, [weekStart]);

	const goToPrevWeek = () => {
		const current = new Date(weekStart);
		current.setDate(current.getDate() - 7);
		setWeekStart(current.toISOString().split('T')[0]);
	};

	const goToNextWeek = () => {
		const current = new Date(weekStart);
		current.setDate(current.getDate() + 7);
		setWeekStart(current.toISOString().split('T')[0]);
	};

	const handleRemoveRecipe = async (
		dayIndex: number,
		section: 'menuUtama' | 'snack',
		id: string
	) => {
		const dayName = days[dayIndex].dayName;

		const { error } = await supabase
			.from('weekly_plan')
			.delete()
			.eq('week_start_date', weekStart)
			.eq('hari', dayName)
			.eq('recipe_id', id);

		if (error) {
			console.log('Gagal hapus dari rencana mingguan', error);
			return;
		}

		setDays((prevDays) =>
			prevDays.map((day, index) =>
				index === dayIndex
					? { ...day, [section]: day[section].filter((r) => r.id !== id) }
					: day
			)
		);
	};

	const handleAddClick = (index: number) => {
		setActiveDayIndex(index);
		setOpenPicker(true);
	};

	const handlePickerClose = () => {
		setOpenPicker(false);
		setActiveDayIndex(null);
	};

	const handleRecipePick = async (recipe: Recipe) => {
		if (activeDayIndex === null) return;

		const dayName = days[activeDayIndex].dayName;
		const section =
			recipe.kategori_menu === 'Menu Utama' ? 'menuUtama' : 'snack';

		const { error } = await supabase.from('weekly_plan').insert({
			week_start_date: weekStart,
			hari: dayName,
			recipe_id: recipe.id,
		});

		if (error) {
			console.log('Gagal tambah ke rencana mingguan', error);
			return;
		}

		setDays((prevDays) =>
			prevDays.map((day, index) =>
				index === activeDayIndex
					? { ...day, [section]: [...day[section], recipe] }
					: day
			)
		);

		setOpenPicker(false);
	};

	return (
		<>
			<div className='flex items-center justify-between mb-3 p-3 border-b-2 border-dashed border-ink/60 bg-paper-shadow'>
				<button onClick={goToPrevWeek} className='doodle-icon bg-paper-shadow'>
					<ChevronLeft size={16} strokeWidth={2.5} className='text-ink'/>
				</button>
				<p className='font-display text-sm text-center'>
					{formatWeekLabel(weekStart)}
				</p>
				<button onClick={goToNextWeek} className='doodle-icon bg-paper-shadow'>
					<ChevronRight size={16} strokeWidth={2.5} className='text-ink'/>
				</button>
			</div>

			<div className='px-3'>
				{days.map((day, index) => (
					<div key={day.dayName}>
						<p>{day.isToday}</p>
						<DailyCard
							key={day.dayName}
							dayName={day.dayName}
							date={day.date}
							isToday={day.isToday}
							menuUtama={day.menuUtama}
							snack={day.snack}
							onAddClick={() => handleAddClick(index)}
							onRemoveRecipe={(section, id) =>
								handleRemoveRecipe(index, section, id)
							}
						/>
					</div>
				))}
			</div>

			{openPicker && activeDayIndex !== null && (
				<RecipePickerModal
					recipes={recipes}
					dayName={days[activeDayIndex].dayName}
					onClose={handlePickerClose}
					onPick={handleRecipePick}
				/>
			)}
		</>
	);
};

export default WeeklyPlanClient;
