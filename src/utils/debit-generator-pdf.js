const pdfCreator = (passageiros, destinasePagamento, data) => {
  const document = {
    content: [
      {
        text: "AUTORIZAÇÃO DE DÉBITO EM CARTÃO DE CRÉDITO",
        style: ["header", "center", "bold"],
      },
      " ",
      {
        text: [
          data.cartao === "V" ? "( x ) VISA  " : "(  ) VISA  ",
          data.cartao === "M" ? "( x ) MASTERCARD  " : "(  ) MASTERCARD  ",
          data.cartao === "A" ? "( x ) AMEX  " : "(  ) AMEX  ",
          data.cartao === "O" ? "( x ) OUTROS" : "(  ) OUTROS",
        ],
        style: ["center", "text"],
      },
      " ",
      table(data),
      " ",
      {
        text: "IMPORTANTE: Essa autorização destina-se ao pagamento de:  ",
        style: ["bold", "text"],
      },
      createListDestinasePagamento(destinasePagamento),
      " ",
      {
        text: [
          { text: "Autorizo", style: ["bold", "text"] },
          "a MR Travel & Tours a debitar de minha conta do cartão de crédito a quantia acima expressa, reconhecendo a dívida aqui expressa e me comprometendo com o seu total pagamento.",
        ],
        style: ["justify", "text"],
      },
      " ",
      {
        text: "Qualquer transação realizada fora dos padrões contratuais das administradoras implicará em sanções legais, tanto para o estabelecimento e seus intermediários, quanto para o Cliente. Ao autorizar o débito no cartão de crédito, Cliente e Estabelecimento declaram estar cientes e concordar com as seguintes condições: ",
        style: ["justify", "textSm", "italics"],
      },
      " ",
      {
        text: "1) Questionamentos os cancelamentos dos serviços adquiridos devem ser resolvidos entre as partes, de acordo com as Condições Gerais do contrato entre Estabelecimento e Cliente;",
        style: ["justify", "textSm", "italics"],
      },
      {
        text: "2) O Estabelecimento e seus intermediários são responsáveis pela correta aceitação, conferindo na apresentação do cartão, sua validade, autenticidade e assinatura do Titular; ",
        style: ["justify", "textSm", "italics"],
      },
      {
        text: "3) Esta autorização é válida por 15 dias e sua transmissão por e-mail ou whatsapp é permitida apenas para agilizar o processo de venda. Em Caso de contestação por parte do Cliente, o Estabelecimento é responsável pela apresentação deste original, cópia do documento oficial que comprove a assinatura do cliente e cópia dos bilhetes / vouchers emitidos. Estes documentos podem ser solicitados a qualquer tempo pelas administradoras; ",
        style: ["justify", "textSm", "italics"],
      },
      {
        text: "4) Caso os serviços sejam prestados em nome de outras pessoas que não o Titular do Cartão, seus nomes deverão ser listados abaixo para maior segurança do Cliente. ",
        style: ["justify", "textSm", "italics"],
      },
      " ",
      {
        text: "Passageiros: ",
        style: ["text"],
      },
      createListPasaggeiros(passageiros),
      " ",
      {
        text: "CARO CLIENTE ",
        style: ["header", "bold"],
      },
      "Para sua segurança não assinar autorizações em branco.",
      " ",
      " ",
      "___________________________________                     _____________________________________________",
      "       Assinatura do Titular do Cartão                                Carimbo e assinatura do Agente de Viagens",
      " ",
      {
        text: "Declaro estar ciente e de acordo com os procedimentos e normas estabelecidas pela agência, bem como declaro ser o de minha inteira responsabilidade a devida compensação dos pagamentos referentes às passagens por mim solicitadas, mesmo sendo na modalidade cartão de crédito.",
        style: ["text", "justify"],
      },
    ],
    styles: {
      header: {
        fontSize: 12,
      },
      text: {
        fontSize: 11,
      },
      center: {
        alignment: "center",
      },
      bold: {
        bold: true,
      },
      justify: {
        alignment: "justify",
      },
      textSm: {
        fontSize: 10,
      },
      italics: {
        italics: true,
      },
      left: {
        alignment: "left",
      },
      rigth: {
        alignment: "rigth",
      },
    },
  };
  return document;
};

const createListPasaggeiros = (passageirosList) => {
  return passageirosList.map((val) => {
    return {
      text: `Nome: ${val.name}`,
    };
  });
};

const createListDestinasePagamento = (destinasePagamentoList) => {
  return destinasePagamentoList.map((val) => {
    return {
      text: val.value,
    };
  });
};

const table = (data) => {
  return {
    layout: "lightHorizontalLines",
    table: {
      widths: ["*", "auto", "*", "auto"],

      body: [
        [
          { text: `NÚMERO DO CARTÃO: ${data.numberCard}`, colSpan: 4 },
          {},
          {},
          {},
        ],
        [{ text: `NOME TITULAR:  ${data.nameCard}`, colSpan: 4 }, {}, {}, {}],
        [
          { text: `CPF Nº:  ${data.cpfNumber}`, colSpan: 2 },
          {},
          {
            text: `RG Nº:  ${data.rneNumber ? data.rneNumber : ""}`,
            colSpan: 2,
          },
          {},
        ],
        [{ text: `TELEFONE:  ${data.phoneNumber}`, colSpan: 4 }, {}, {}, {}],
        [
          { text: `VALIDADE DO CARTÃO:  ${data.validCardDate}`, colSpan: 2 },
          {},
          { text: `CÓDIGO:  ${data.codeCard}`, colSpan: 2 },
          {},
        ],
        [
          {
            text: `VALOR DA TRANSAÇÃO: R$  ${data.transactionValue}`,
            colSpan: 2,
          },
          {},
          { text: `DATA DA TRANSAÇÃO: ${data.dataTransacao}`, colSpan: 2 },
          {},
        ],
        [
          {
            text: `VALOR DE CADA PARCELA: 1x R$ ${
              data.valorPrimeiraParcela
            } + ${data.numberParcela - 1}x R$ ${data.restosParcelas}`,
            colSpan: 3,
          },
          {},
          {},
          { text: `Nº DE PARCELAS: ${data.numberParcela}`, colSpan: 1 },
        ],
        [
          { text: "AGÊNCIA DE VIAGENS: MR Travel & Tours ", colSpan: 4 },
          {},
          {},
          {},
        ],
      ],
    },
  };
};

export default pdfCreator;
