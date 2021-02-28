const FORMAT_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
};

/**
 * Function to format date with options
 * @param {string} date - timestamp
 */
export const dateToHumanFormat = (date) =>
  new Date(date).toLocaleString('en-US', FORMAT_OPTIONS);
