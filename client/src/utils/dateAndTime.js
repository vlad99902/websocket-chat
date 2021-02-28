const FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

/**
 * Function to format date with options
 * @param {string} date - timestamp
 */
export const dateToHumanFormat = (date) =>
  new Date(date).toLocaleString('en-US', FORMAT_OPTIONS);
