
// Helper function to ensure we have a valid date object
export function ensureValidDate(date: any): Date {
  try {
    const dateObj = new Date(date);
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date encountered, using current date instead:", date);
      return new Date(); // Return current date as fallback
    }
    return dateObj;
  } catch (e) {
    console.error("Error parsing date:", e);
    return new Date(); // Return current date as fallback
  }
}
