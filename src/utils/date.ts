export function getMonthDays(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

export function getFirstDay(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}