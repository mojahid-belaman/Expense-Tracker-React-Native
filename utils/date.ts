export function getFormatterDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getDateLast7Days(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
}
