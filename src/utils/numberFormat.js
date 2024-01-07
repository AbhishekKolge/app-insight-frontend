const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN', {}).format(value);
};

const fixedDecimals = (number, decimalPlaces = 2) => {
  if (number % 1 === 0) {
    return number.toString();
  } else {
    return number.toFixed(decimalPlaces);
  }
};

export { formatCurrency, formatNumber, fixedDecimals };
