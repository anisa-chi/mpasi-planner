import { Recipe } from "@/types/recipe";
import { supabase } from "./supabase";
import { generateWeekDays } from "./date";

export interface DayData {
  dayName: string;
  date: string;
  isToday: boolean;
  menuUtama: Recipe[];
  snack: Recipe[]
}

export const fetchWeekDays = async (weekStart: string, recipes: Recipe[]): Promise<DayData[]> => {
  const { data: weeklyPlanRows } = await supabase
    .from('weekly_plan')
    .select('id, hari, recipe_id')
    .eq('week_start_date', weekStart)

  const weekDays = generateWeekDays(new Date(weekStart))

  return weekDays.map((day) => {
    const rowsForDay = (weeklyPlanRows ?? []).filter((row) => row.hari === day.dayName)
    const menuUtama = rowsForDay.map((row) => recipes.find((recipe) => recipe.id === row.recipe_id)).filter((row): row is Recipe => row?.kategori_menu === 'Menu Utama')

    const snack = rowsForDay.map((row) => recipes.find((recipe) => recipe.id === row.recipe_id)).filter((row): row is Recipe => row?.kategori_menu === 'Snack')
    return { ...day, menuUtama, snack }
  })
}