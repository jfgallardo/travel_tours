import valid from 'card-validator';

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);
  creditCard.cardholderName = valid.cardholderName(values.cardName);
  creditCard.postalCode = valid.postalCode(values.cardPostalCode);

  errors.show = true;
  errors.variant = 'bg-red-400';
  errors.message = 'An unknown error occured. Please try again later';
  errors.cname = false;
  errors.cnumber = false;
  errors.ctype = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.cpostal = false;
  errors.niceType = '';

  /* if (values.cardPostalCode === null || !values.cardPostalCode.trim()) {
    errors.niceType = creditCard.card?.niceType;
    errors.message = 'Credit card postal code is not complete';
  } else if (creditCard.postalCode.isValid) {
    errors.cpostal = true;
  } else {
    errors.niceType = creditCard.card?.niceType;
    errors.message = 'Credit card postal code is invalid';
  }*/

  //Card CVV expiration
  if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    errors.message = 'Credit card CVC is not complete';
    errors.niceType = creditCard.card?.niceType;
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.niceType = creditCard.card?.niceType;
    errors.message = 'Credit card CVC is invalid';
  }

  //Card Expiration Verification
  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.niceType = creditCard.card?.niceType;
    errors.message = 'Credit card expiration date is not complete';
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = 'Credit card expiration date is invalid';
    errors.niceType = creditCard.card?.niceType;
  }

  //Card Type Verification
  /* if (
    values.cardType === null ||
    !values.cardType.trim() ||
    creditCard.card === null
  ) {
    errors.message = 'Credit card type is not complete';
    errors.niceType = creditCard.card?.niceType;
  } else if (
    creditCard.card.type &&
    creditCard.card.type.toUpperCase() === values.cardType.toUpperCase()
  ) {
    errors.ctype = true;
  } else {
    errors.message = 'Credit card type is invalid';
    errors.niceType = creditCard.card?.niceType;
  }*/

  //Cardholder Name Verification
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = 'Cardholder name is not complete';
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = 'Cardholder name is invalid';
    errors.niceType = creditCard.card?.niceType;
  }

  //Card Number Verification
  if (values.cardNumber === null || !values.cardNumber) {
    errors.message = 'Credit card number is not complete';
    errors.niceType = creditCard.card?.niceType;
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = 'Credit card number is invalid';
    errors.niceType = creditCard.card?.niceType;
  }

  if (errors.cnumber && errors.cname && errors.cexp && errors.ccvv) {
    errors.variant = 'bg-green-400';
    errors.message = 'Credit Card is valid';
    errors.niceType = creditCard.card?.niceType;
  }

  return errors;
}
