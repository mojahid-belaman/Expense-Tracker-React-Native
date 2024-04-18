export function getFormatterDate(date: Date): string {
  const months =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const days =
    date.getDay() < 10 ? "0" + (date.getDay() + 1) : date.getDay() + 1;
  return `${date.getFullYear()}-${months}-${days}`;
}

export function getDateLast7Days(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
}
