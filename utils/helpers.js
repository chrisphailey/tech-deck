// Turns the data into a month/day/year format
const format_date = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${month}/${day}/${year}`;
  };

module.exports = {
    format_date, format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
}