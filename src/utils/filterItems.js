export const arrayAinB = (array_1, array_2) => {
  for (let i = 0; i < array_1.length; i++) {
    for (let j = 0; j < array_2.length; j++) {
      if (array_2[j] === array_1[i]) return true;
    }
  }
  return false;
};
