export const emailValidation = (value) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const validationValid = emailRegex.test(value);
  const validationMessage = validationValid
    ? ''
    : 'Correo electrónico inválido';

  return {
    valid: validationValid,
    message: validationMessage,
  };
};

export const passwordValidation = {
  minLength: (value) => {
    const validationValid = value.length >= 8;
    const validationMessage = validationValid
      ? ''
      : 'La contraseña debe tener al menos 8 caracteres';
    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
  maxLength: (value) => {
    const validationValid = value.length <= 30;
    const validationMessage = validationValid
      ? ''
      : 'La contraseña no debe tener más de 30 caracteres';
    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
  hasUpperCase: (value) => {
    const hasUpperCase = /(?=.*[A-Z])/;
    const validationValid = hasUpperCase.test(value);

    const validationMessage = validationValid
      ? ''
      : 'Debe tener al menos una letra mayúscula.';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
  hasLowerCase: (value) => {
    const hasLowerCase = /(?=.*[a-z])/;
    const validationValid = hasLowerCase.test(value);

    const validationMessage = validationValid
      ? ''
      : 'Debe tener al menos una letra minúscula.';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
  hasDigit: (value) => {
    const hasDigit = /(?=.*\d)/;
    const validationValid = hasDigit.test(value);

    const validationMessage = validationValid
      ? ''
      : 'Debe tener al menos un dígito numérico.';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
};

export const requiredValidation = (value) => {
  const validationValid = !!value.trim();
  const validationMessage = validationValid ? '' : 'Este campo es obligatorio';

  return {
    valid: validationValid,
    message: validationMessage,
  };
};

export const cpfValidation = {
  requiredValidation,
  isCPF: (cpf) => {
    let multiplic1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    let multiplic2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    cpf = cpf.trim().replaceAll('.', '').replace('-', '');

    if (cpf.length < 11) {
      const validationValid = false;
      const validationMessage = validationValid ? '' : 'Longitud incorrecta';
      return {
        valid: validationValid,
        message: validationMessage,
      };
    } else {
      let tempCpf = cpf.substring(0, 9);
      let sum = 0;
      let arrChars = tempCpf.split('');
      for (let i = 0; i < 9; i++) {
        sum += parseInt(arrChars[i]) * multiplic1[i];
      }
      let remainder = sum % 11;
      if (remainder < 2) {
        remainder = 0;
      } else {
        remainder = 11 - remainder;
      }
      let digit = remainder.toString();
      tempCpf = tempCpf + digit;
      sum = 0;
      arrChars = tempCpf.split('');
      for (let i = 0; i < 10; i++) {
        sum += parseInt(arrChars[i]) * multiplic2[i];
      }
      remainder = sum % 11;
      if (remainder < 2) {
        remainder = 0;
      } else {
        remainder = 11 - remainder;
      }
      digit = digit + remainder.toString();
      const regXP = new RegExp(digit + '$', 'i');
      if (cpf.length > 11) cpf = cpf.slice(0, 11);
      const validationValid = regXP.test(cpf);
      const validationMessage = validationValid
        ? ''
        : 'Valor introducido incorrecto';
      return {
        valid: validationValid,
        message: validationMessage,
      };
    }
  },
};

export const cepValidation = {
  requiredValidation,
  isCEP: (cep) => {
    const cepRegex = /^\d{8}$/;
    cep = cep.trim().replaceAll('.', '').replace('-', '');

    if (cep.length > 8) cep = cep.slice(0, 8);

    const validationValid = cepRegex.test(cep);
    const validationMessage = validationValid ? '' : 'CEP inválido';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
};

export const phoneValidation = {
  requiredValidation,
  isPhoneNumber: (value) => {
    const phoneRegex = /^\d{11}$/;
    value = value.trim().replace('-', '').replace('(', '').replace(')', '');
    if (value.length > 11) value = value.slice(0, 11);

    const validationValid = phoneRegex.test(value);
    const validationMessage = validationValid ? '' : 'Phone Number inválido';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
};
