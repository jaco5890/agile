export const validPassword = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
);
export const mediumPasword = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
);
export const onlyLetters = new RegExp(/^[A-Za-z]+[A-Za-z ]*$/);
export const onlyLettersWithSpaceAndHyphen = new RegExp(/^[a-zA-Z \-,.()]*$/);
export const validEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const onlyNumbers = new RegExp(/^[0-9]{10}$/);
export const allCharsAllowedForDeliveryNotes = new RegExp(
  "^[A-Za-z0-9 ,.!@#$^&()-_=+\\[\\]{}|:,.<>?/`\\t]*$"
);
