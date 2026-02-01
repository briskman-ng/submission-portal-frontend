export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    currencySign: 'accounting',
  }).format(amount);
};

export const formatNumber = (value: number) => value.toLocaleString();
