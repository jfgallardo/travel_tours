import { defineRule, configure } from "vee-validate";
import { required, alpha_spaces } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";

defineRule("required", required);
defineRule("alpha_spaces", alpha_spaces);

defineRule('digitsCard', value => {
  let regexp = /^\d{4}[-]\d{4}[-]\d{4}[-]\d{4}$/;

  if (!value || !value.length) {
    return true;
  }

  if (!regexp.test(value)) {
    return false;
  }
  return true;
});

defineRule('validCard', value => {
  const date = new Date()
  const currentYear = date.getFullYear().toString();

  if (!value || !value.length) {
    return true;
  }

  if (value.split('/')[0] > 12 || value.split('/')[1] < currentYear.substring(2, 4)) {
    return false
  }
  return true;
})

defineRule('cpfNumber', value => {
  let regexp = /^\d{3}[.]\d{3}[.]\d{3}[-]\d{2}$/;

  if (!value || !value.length) {
    return true;
  }

  if (!regexp.test(value)) {
    return false;
  }
  return true;
})

defineRule('phone', value => {
  let regexp = /^[(]\d{2}[)][\s]\d{5}[-]\d{4}$/;

  if (!value || !value.length) {
    return true;
  }

  if (!regexp.test(value)) {
    return false;
  }
  return true;
})

defineRule('invaliDate', value => {
  let regexp = /^(\d{4})(\/|-)(0[1-9]|1[0-2])\2([0-2][0-9]|3[0-1])$/


  if (!value || !value.length) {
    return true;
  }

  if (!regexp.test(value)) {
    return false;
  }
  return true;
})

defineRule('minValue', (value, [target], ctx) => {
  if (!value || !value.length) {
    return true;
  }

  if (parseFloat(value) > parseFloat(ctx.form[target])) {
    return false
  }
  return true
})

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "This field is required",
        digitsCard: "Wrong value, check numbers",
        alpha_spaces: "Only alphabetic characters or spaces",
        validCard: "Wrong date format",
        cpfNumber: "Wrong value, check CPF",
        phone: "Wrong phone number format",
        invaliDate: "Invalid date",
        minValue: "The amount of the first installment cannot exceed the transaction amount"
      },
    },
    es: {
      messages: {
        required: "Este campo es obligatorio",
        digitsCard: "Valor incorrecto, verifique los números",
        alpha_spaces: "Solo caracteres alfabéticos o espacios",
        validCard: "Formato de fecha incorrecta",
        cpfNumber: "Valor incorrecto, verifique CPF",
        phone: "Formato de numero de telefono incorrecto",
        invaliDate: "Fecha inválida",
        minValue: "El monto de la primera cuota no puede exceder el monto de la transacción"
      },
    },
    br: {
      messages: {
        required: "Este campo é obrigatório",
        digitsCard: "Valor errado, verifique os números",
        alpha_spaces: "Apenas caracteres alfabéticos ou espaços",
        validCard: "Formato de data errado",
        cpfNumber: "Valor errado, verifique CPF",
        phone: "Formato errado",
        invaliDate: "Data inválida",
        minValue: "O valor da primeira parcela não pode exceder o valor da transação"
      },
    },
  }),
});
