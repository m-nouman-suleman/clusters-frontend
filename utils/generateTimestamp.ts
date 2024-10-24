export const generateTimestamps = (numPoints:number) => {
  const startDate = new Date('2024-11-01');
  const timestamps = [];

  for (let i = 0; i < numPoints; i++) {
    // Format the date as YYYY-MM-DD
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0]; // Get the date part without time
    timestamps.push(formattedDate);
  }

  return timestamps;
};