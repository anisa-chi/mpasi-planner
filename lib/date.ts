const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export const getMonday = (date: Date): Date => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date)
  monday.setDate(date.getDate() + diff)
  return monday;
}

export const generateWeekDays = (weekStart: Date) => {
  const today = new Date();
  const todayString = today.toDateString();

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(weekStart)
    current.setDate(weekStart.getDate() + i)

    return {
      dayName: DAY_NAMES[current.getDay()],
      date: current.toLocaleDateString('id-ID', { day: "numeric", month: 'short' }),
      isToday: current.toDateString() === todayString
    }
  })
}

export const formatWeekLabel = (weekStartString: string): string => {
  const start = new Date(weekStartString)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const startLabel = start.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })
  const endLabel = end.toLocaleDateString('id-Id', { day: 'numeric', month: 'long', 'year': 'numeric' })

  return `${startLabel} - ${endLabel}`
}