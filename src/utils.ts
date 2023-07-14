export const formatedPrice = (price: number) => {
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: 'MAD',
  }).format(price / 100);
};
