export const convertToRupees = (dollars: number): number => {
  return Math.round(dollars * 40);
};

export const formatPrice = (amount: number, currency: 'USD' | 'INR' = 'INR'): string => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toFixed(2)}`;
};