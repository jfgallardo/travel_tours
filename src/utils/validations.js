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
    const validationValid = value.length <= 20;
    const validationMessage = validationValid
      ? ''
      : 'La contraseña no debe tener más de 20 caracteres';
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
  isCPF: (value) => {
    const cpfRegex = /^\d{3}[.]\d{3}[.]\d{3}-\d{2}$/;
    const validationValid = cpfRegex.test(value);
    const validationMessage = validationValid ? '' : 'CPF inválido';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
};

export const cepValidation = {
  requiredValidation,
  isCEP: (value) => {
    const cepRegex = /^\d{5}-\d{3}$/;
    const validationValid = cepRegex.test(value);
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
    const phoneRegex = /^[(]\d{2}[)]\s\d{5}-\d{4}$/;
    const validationValid = phoneRegex.test(value);
    const validationMessage = validationValid ? '' : 'Phone Number inválido';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
};

export const onlyPhoneValidation = {
  isPhoneNumber: (value) => {
    if (!value.trim()) {
      return {
        valid: true,
        message: '',
      };
    }
    const phoneRegex = /^[(]\d{2}[)]\s\d{5}-\d{4}$/;
    const validationValid = phoneRegex.test(value);
    const validationMessage = validationValid ? '' : 'Phone Number inválido';

    return {
      valid: validationValid,
      message: validationMessage,
    };
  },
};
