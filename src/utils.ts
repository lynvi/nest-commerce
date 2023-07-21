import { string } from 'joi';

export const formatedPrice = (price: number) => {
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: 'MAD',
  }).format(price / 100);
};

export function cleanUpSpecialChars(str: string) {
  return (
    str
      .replace(/[ÀÁÂÃÄÅ]/g, 'A')
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[ÈÉÊË]/g, 'E')
      //.... all the rest
      .replace(/[^a-z0-9]/gi, '')
  ); // final clean up
}
