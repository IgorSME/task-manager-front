export const formatDate = (dateString: string | Date): string => {
  const date = dateString instanceof Date ? dateString : new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateForTextField = (date: Date): string => {
  if (!date) {
    return '';
  }

  const dateObject = typeof date === 'string' ? new Date(date) : date;
  const year = dateObject.getFullYear();
  const month = `0${dateObject.getMonth() + 1}`.slice(-2);
  const day = `0${dateObject.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};
