export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayData = state.days.filter(d => d.name === day)
  if (dayData.length === 0) return result;
  for (const a of dayData[0].appointments) {
    result.push(state.appointments[a]);
  }
  return result
};