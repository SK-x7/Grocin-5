/*eslint no-unused-vars: "error"*/
export function formatDateOfOrders(dateString) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    const date = new Date(dateString);
  
    // Separate date and time parts
    const [datePart, timePart] = date.toLocaleString('en-GB', options).split(', ');
  
    return `${datePart.replace(/\//g, '/')} at ${timePart}`;
  }