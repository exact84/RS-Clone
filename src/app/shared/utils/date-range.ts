export function getDateRange(monthsAgo: number): { from: string; to: string } {
  const today = new Date();
  const past = new Date(today);
  past.setMonth(today.getMonth() - monthsAgo);
  if (past > today) past.setFullYear(today.getFullYear() - 1);

  return {
    from: past.toISOString().split('T')[0],
    to: today.toISOString().split('T')[0],
  };
}
