import { string } from 'joi';
import { customAlphabet } from 'nanoid';

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

export const nanoid = customAlphabet(
  '1234567890qwertyuiopasdfghjklzxcvbnQWERTYUIOPLKJHGFDSAZXCVBN',
  10,
);
