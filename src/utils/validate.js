import { object, string } from 'yup';

export const simpleSchemaContract = object({
  name_client: string()
    .required()
    .matches(/^[a-zA-Z ]*$/, { message: 'Apenas letras' })
    .label('Nome'),
  civil_status: string().required().label('Estado civil'),
  occupation: string().required().label('Profissão'),
  passaporte: string().nullable().label('Passaporte'),
  cpf_number: string()
    .matches(/^\d{3}[.]\d{3}[.]\d{3}[-]\d{2}$/, { message: 'Invalid CPF' })
    .required('CPF is required field'),
  rne_number: string(),
  nationality_other: string(),
  phone_number: string()
    .matches(/^[(]\d{2}[)][\s]\d{5}[-]\d{4}$/, { message: 'Invalid Phone' })
    .required('Phone number is required field'),
  email: string().required().email().label('Email'),
  cep: string()
    .required()
    .matches(/^\d{5}[-]\d{3}$/, { message: 'Invalid CEP' })
    .label('CEP'),
  street: string().required().label('Rua'),
  district: string().required().label('Bairro'),
});

export const simpleSchemaReservation = object({
  transaction_value: string().required().label('Transaction'),
  dateTransaction: string().required().label('Date'),
  route: string()
    .matches(/^(\D{3}\/\D{3})([/]\D{3}){0,5}$/, {
      message: 'Exemplo: BSB/PTY/HAV',
    })
    .required()
    .label('Itinerário'),
  numberCard: string()
    .nullable()
    .matches(/^\d{4}[-]\d{4}[-]\d{4}[-]\d{4}$/, {
      message: 'Wrong value, check numbers',
    }),
  nameCard: string()
    .matches(/^[a-zA-Z ]*$/, { message: 'Apenas letras' })
    .nullable(),
  validCardDate: string()
    .nullable()
    .matches(/^0[1-9]|1[0-2]\/2[2-9]|[3-9][0-9]$/, {
      message: 'Wrong date, check numbers',
    }),
  transactionValue: string().matches(/^\d*[.]\d{2}$/, {
    message: 'Check decimal values',
  }),
  rate: string().matches(/^\d*[.]\d{2}$/, { message: 'Check decimal values' }),
  rav: string().matches(/^0|(\d*[.]\d{2})$/, {
    message: 'Check decimal values',
  }),
  rc: string().matches(/^\0|(d*[.]\d{2})$/, {
    message: 'Check decimal values',
  }),
  number_plots: string(),
});

export const simpleSchemaService = object({
  service: string().required(),
});

export const simpleSchemaPassenger = object({
  passageiro: string()
    .matches(/^[a-zA-Z ]*$/, { message: 'Apenas letras' })
    .required(),
});

export const simpleSchemaInformationUser = object({
  fullName: string()
    .required()
    .matches(/^[a-zA-Z ]*$/, { message: 'Apenas letras' })
    .label('Nome completo'),
  birthday: string().required().label('Data de Nascimento'),
  cpf: string()
    .matches(/^\d{3}[.]\d{3}[.]\d{3}[-]\d{2}$/, { message: 'Invalid CPF' })
    .required('CPF is required field'),
  cep: string()
    .matches(/^\d{5}[-]\d{3}$/, { message: 'Invalid CEP' })
    .label('CEP'),
});
