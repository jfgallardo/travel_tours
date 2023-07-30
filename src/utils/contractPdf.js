import {usePdfStore} from '@/stores/pdf';

const pdfCreatorContract = (data) => {
  const pdfStore = usePdfStore();
  const date = new Date();
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  return {
    content: [
      {
        text: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE VIAGEM',
        style: ['header', 'center', 'bold', 'underlined'],
      },
      ' ',
      ' ',
      {
        text: 'PRESTADORA E MEDIADORA DE SERVIÇOS CONTRATADA:',
        style: ['header', 'left', 'bold', 'underlined'],
      },
      ' ',
      {
        text: [
          {text: 'MR TRAVEL & TOURS LTDA', style: ['bold', 'text']},
          ', pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 30.876.256/0001-28, com sede na Rua Hélio Batelão, nº 439-A, bairro: Mondubim, CEP: 60.766-055, Fortaleza/CE, representada por',
          {text: ' CARLOS LAZARO MADRAZO REYES', style: ['bold', 'text']},
          ', brasileiro naturalizado, divorciado, analista de sistema e empresário, portador de Cédula de Identidade – RG nº 2017090747-8 SSP-CE, inscrito no CPF sob o nº 621.669.873-70, residente e domiciliado na Rua Hélio Batelão, nº 439-A, bairro: Mondubim, CEP: 60.766-055, Fortaleza/CE',
        ],
        style: ['justify', 'text'],
      },
      ' ',
      {
        text: 'CLIENTE (S) CONTRATANTE (S): ',
        style: ['header', 'left', 'bold', 'underlined'],
      },
      ' ',
      {
        text: `Nome: ${data.name_client}, ${data.nationality}, ${
            data.civil_status
        }, ${
            data.occupation
        }, portador (a) do documento de identificação de nº ${
            data.passaporte ? data.passaporte : data.rne_number
        }, inscrito (a) no CPF sob o nº ${
            data.cpf_number
        }, residente e domiciliado na Rua ${data.street}, ${
            data.district
        }, CEP ${data.cep}, ${data.localidadeCl}/${
            data.ufCl
        }, celular/Whatsapp: ${data.phone_number}, endereço de e-mail ${
            data.email
        }`,
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'DO OBJETO DO CONTRATO',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Primeira', style: ['bold', 'text']},
          ' – a',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ' compromete-se a',
          {text: ' prestar assessoria turística', style: ['bold', 'text']},
          `, atuando como mediadora na prestação dos serviços de viagem e turismo com destino a ${data.destino_reserva}, na data de ${data.travelDate}`,
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Primeiro', style: ['bold', 'text']},
          ': a prestação dos serviços contratados englobam:',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      table(pdfStore),
      ' ',
      {
        text: [
          {text: 'Parágrafo Segundo:', style: ['bold', 'text']},
          ' não estarão incluídos no preço do pacote, despesas como taxas com expedição de documentos, obtenção de vistos consulares, taxas de embarques (aeroportos ou portos), taxa pró-turismo, ingressos de qualquer natureza, taxas com expedição e carregamento de bagagens, malas, atrativos como filmes de vídeo e TV a cabo, telefonemas, bebidas, produtos do frigobar, restaurantes e serviços de quarto. As despesas provenientes de diárias, refeições e deslocamento, quando excedentes às incluídas no programa, que, por qualquer motivo ocorrer, serão suportadas pelo CLIENTE.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      ' ',
      {
        text: 'DOS VALORES E PAGAMENTOS',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Segunda', style: ['bold', 'text']},
          ' – para a execução do objeto deste contrato, a título de',
          {text: ' PAGAMENTO', style: ['bold', 'text']},
          ', será cobrado o valor de',
          {
            text: ` R$ ${pdfStore.fullTransactionValue} (reais)`,
            style: ['bold', 'text'],
          },
          ', que poderá ser pago da seguinte forma:',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          'À	vista',
          {
            text: ` R$ ${pdfStore.fullTransactionValue} (reais)`,
            style: ['bold', 'text'],
          },
          ', paga em ',
          {
            text: `${
                (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
                +
                '/' +
                (date.getMonth() > 8
                    ? date.getMonth() + 1
                    : '0' + (date.getMonth() + 1))
                +
                '/' +
                date.getFullYear()
            }`,
            style: ['bold', 'text'],
          },
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Ou',
        style: ['text', 'justify'],
      },
      payment(pdfStore),
      ' ',
      {
        text: 'A – O valor acima descrito poderá ser pago através de boleto, ou de deposito, ou transferência, ou PIX bancário, ou para umas das contas a seguir indicadas:',
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Llave PIX CNPJ de Nubank: 30876256000128',
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Banco do Brasil',
        style: ['text', 'justify'],
      },
      {
        text: 'Agência: 3472-0',
        style: ['text', 'justify'],
      },
      {
        text: 'Conta corrente: 75317-3',
        style: ['text', 'justify'],
      },
      {
        text: 'Titular: MR TRAVEL & TOURS LTDA',
        style: ['text', 'justify'],
      },
      {
        text: 'CNPJ: 30.876.256/0001-28',
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Bradesco',
        style: ['text', 'justify'],
      },
      {
        text: 'Agência: 628',
        style: ['text', 'justify'],
      },
      {
        text: 'Conta corrente: 20254-1',
        style: ['text', 'justify'],
      },
      {
        text: 'Titular: MR TECNOLOGIA E SERVICOS',
        style: ['text', 'justify'],
      },
      {
        text: 'CNPJ: 30.876.256/0001-28',
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Nu Pagamentos (banco 260)',
        style: ['text', 'justify'],
      },
      {
        text: 'Agência: 0001-9',
        style: ['text', 'justify'],
      },
      {
        text: 'Conta corrente: 69675449-9',
        style: ['text', 'justify'],
      },
      {
        text: 'Titular MR TRAVEL & TOURS LTDA',
        style: ['text', 'justify'],
      },
      {
        text: 'CNPJ: 30.876.256/0001-28',
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Ou',
        style: ['text', 'justify'],
      },
      {
        text: 'B – Através de cartão de crédito.',
        style: ['text', 'justify'],
      },
      ' ',
      ' ',
      {
        text: [
          {text: 'Parágrafo Primeiro', style: ['bold', 'text']},
          ' – eventual atraso no pagamento refletirá à parte',
          {text: 'CONTRATANTE', style: ['bold', 'text']},
          ', sobre o saldo devedor, multa de',
          {text: '10% (dez por cento)', style: ['bold', 'text']},
          ' sem prejuízo de juros de',
          {text: '1% (um por cento)', style: ['bold', 'text']},
          ' ao mês e correção monetária consoante a variação do IGP-M, sobre o valor do débito.',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Segundo', style: ['bold', 'text']},
          ' – o presente contrato consiste em título executivo extrajudicial, e como tal é considerado pelas partes signatárias.',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Terceiro', style: ['bold', 'text']},
          ' – a quitação será dada quando da emissão dos respectivos Recibos de Pagamento de Prestação de Serviços Advocatícios.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      ' ',
      {
        text: 'DAS OBRIGAÇÕES DA VIAGEM',
        style: ['header', 'center', 'bold'],
      },
      {
        text: 'Das Obrigações da Agência de Viagem',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Terceira:', style: ['bold', 'text']},
          ' a CONTRATADA é responsável pelo planejamento, organização e execução da programação, e mesmo sendo intermediária entre o (a)(s) CONTRATANTE e os demais prestadores de serviço (pessoas físicas e jurídicas), responde pela escolha, nos termos da lei civil e no que couber, nos termos da legislação regente das relações de consumo. Consequentemente, não responde, nem se solidariza, por quaisquer atos, fatos ou eventos, onde a responsabilidade legal ou contratual das demais pessoas físicas ou jurídicas, seja direta ou específica, como no caso dos transportadores terrestres, serviços hoteleiros e empresas locais contratadas, que responderão na forma da lei.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Quarta:', style: ['bold', 'text']},
          ' em que pese à responsabilidade definida na clausula anterior, a',
          {text: 'CONTRATADA', style: ['bold', 'text']},
          ' não é responsável por atrasos, greves, antecipações de horários, condições atmosféricas, catástrofes naturais, decisões governamentais, atos de terrorismo, roubos e furtos, bem como outros motivos de força maior ou casos fortuitos, sendo os possíveis gastos pessoais decorrentes de tais circunstâncias, de responsabilidade do passageiro.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Quinta:', style: ['bold', 'text']},
          ' declara que o presente contrato de prestação de serviços está em conformidade com a Deliberação Normativa nº 161, de 09/08/85, da EMBRATUR.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Sexta:', style: ['bold', 'text']},
          ' a programação poderá sofrer alterações, a exclusivo critério da',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ', por motivo de força maior, tais como condições climáticas adversas, mudanças de horário dos atrativos previstos, aumentos de combustíveis, mudança na moeda ou política econômica do Governo ou outros que a AGÊNCIA julgue interferir na segurança ou bem-estar dos demais passageiros.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Único:', style: ['bold', 'text']},
          ' resta à sua escolha do (a)(s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ' a aceitação dessas alterações com o devido reembolso de eventuais diferenças existentes em seu favor ou a rescisão do contrato com a devolução da totalidade dos valores efetivamente pagos até a data.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Sétima:', style: ['bold', 'text']},
          ' a',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ' será a primeira a ser contatada pelo seguro de saúde, ou pela agência de viagens, em caso de emergência no decurso da viagem.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'Das Obrigações do Cliente',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Oitava:', style: ['bold', 'text']},
          ' ao participar da programação da',
          {text: 'CONTRATADA', style: ['bold', 'text']},
          ', o (a) (s)',
          {text: 'CONTRATANTE (S)', style: ['bold', 'text']},
          ', individualmente, ou através de agência de viagens sua mandatária, declara conhecer, pelo que adere contratualmente, às condições gerais relativas ao programa adquirido.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Nona:', style: ['bold', 'text']},
          ' o (a) (s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ' obriga (m)-se a chegar nos horários ajustados para as saídas e retornos.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Primeiro:', style: ['bold', 'text']},
          ' a',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ' não está obrigada a tolerar atrasos do (a) (s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ' que deverá (ão) respeitar os horários e tempo de tolerância pré-determinados.',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Segundo:', style: ['bold', 'text']},
          ' caso ocorra atraso por parte do (a) (s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ', a CONTRATADA poderá sair no horário ajustado mesmo sem a presença daquele (a) (s).',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Terceiro:', style: ['bold', 'text']},
          ' para os passeios de 01 (um) dia ou viagens com pernoite, o não comparecimento no horário informado pelo receptivo caracterizará desistência (NO SHOW). Não receberá qualquer restituição, bem como também não poderá solicitar que a ',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ' reagende seu passeio/viagem para uma nova data. Por qualquer que seja o motivo/razão do não comparecimento no dia da sua viagem/passeio.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Dez:', style: ['bold', 'text']},
          ' Todas as despesas excedentes ao estipulado neste contrato serão de inteira responsabilidade do (a) (s)',
          {text: ' CONTRATANTE (S).', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'DOS DOCUMENTOS PARA EMBARQUE',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Onze:', style: ['bold', 'text']},
          ' o (a) (s)',
          {text: ' CONTRATANTE (S),', style: ['bold', 'text']},
          ', no ato do embarque, deverá (ão) apresentar à',
          {text: 'CONTRATADA', style: ['bold', 'text']},
          ', alternativamente, documento de Registro Geral emitido pela Secretaria de Segurança Pública do Estado emissor (RG/SSP), Carteira Nacional de Habilitação (CNH), Registro Nacional de Estrangeiro (RNE) ou Passaporte, no caso de estrangeiros não residentes do país. Se for viagem ao exterior e não sendo o país de destino um membro do MERCOSUL, será necessário apresentar o Passaporte com a validade requerida pelo país. O documento deve ser apresentado em sua via original, estar legível e em bom estado. Não é permitido o embarque com outros documentos, além dos citados acima. Para crianças de até 05 (cinco) anos de idade, a apresentação do Registro de Nascimento (certidão) ou Carteira de Identidade do menor, original ou cópia autenticada, é o suficiente para o seu embarque em viagens nacionais.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Doze:', style: ['bold', 'text']},
          ' menores de 16 (dezesseis) anos, viajando desacompanhados de pelo menos um dos pais ou parentes (Irmãos, Tios, Avós, Sobrinhos), deve providenciar autorização judicial, que deverá consistir em declaração assinada por ambos os pais, em duas vias de igual teor, com firma reconhecida em cartório por “autenticidade” ou por “verdadeiro”, autorizando o (a) filho (a) a viajar desacompanhado (a) dos mesmos pelo prazo da viagem. Somente serão aceitos os modelos de autorização obtidos junto à',
          {text: 'CONTRATADA.', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'DA RESCISÃO DO CONTRATO',
        style: ['header', 'center', 'bold'],
      },
      {
        text: [
          {text: 'Cláusula Treze:', style: ['bold', 'text']},
          ' a não apresentação de algum dos documentos descritos nas cláusulas doze e treze deste contrato acarretará a impossibilidade de embarque e a imediata rescisão do contrato, sem a devolução de qualquer quantia já paga para a',
          {text: ' CONTRATADA.', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Catorze:', style: ['bold', 'text']},
          ' reserva-se a ',
          {text: 'CONTRATADA ', style: ['bold', 'text']},
          ' o direito de proceder ao desligamento do (a) (s) ',
          {text: 'CONTRATANTE (S) ', style: ['bold', 'text']},
          ' da programação objeto do presente contrato, caso seja constatada ocorrência de natureza grave, tal como uso de álcool, drogas e entorpecentes, envolvimento em brigas, falta de respeito dentre os demais viajantes e com pessoas no entorno, entre outros.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Único: ', style: ['bold', 'text']},
          ' quaisquer despesas decorrentes destes incidentes, e o desligamento do (a) (s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ' bem como qualquer dano que ele/ela (s) venha (m) a causar no decurso da viagem, correrão por sua conta e risco, ainda que adiantadas pela',
          {text: ' CONTRATADA.', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Quinze: ', style: ['bold', 'text']},
          ' a',
          {text: ' CONTRATADA ', style: ['bold', 'text']},
          ' pode rescindir unilateralmente o contrato, mediante a devolução dos valores pagos, caso não atinja a quantidade mínima passageiros em até 72 (setenta e duas) horas antes do embarque de saída.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: ' Parágrafo Primeiro: ', style: ['bold', 'text']},
          ' o reembolso dos valores será pago no prazo de até 30 (trinta) dias corridos a partir da data de confirmação do cancelamento por parte da contratada.',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Segundo: ', style: ['bold', 'text']},
          ' para compras realizadas no cartão de crédito, o reembolso (estorno) será feito direto na fatura do cartão de crédito utilizado e será enviado o comprovante e para compras realizadas via boleto bancário ou em espécie pessoalmente na agência, será feito depósito bancário/DOC/PIX direto na conta corrente do (a) (s) ',
          {text: ' CONTRATANTE (S).', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Terceiro: ', style: ['bold', 'text']},
          ' estabelece-se que a quantidade mínima de passageiros mencionada no “caput” desta cláusula será: ',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'a) ônibus – 35 (trinta e cinco) passageiros para o embarque;',
        style: ['text', 'left'],
      },
      {
        text: 'b) micro-ônibus – 20 (vinte) passageiros para o embarque;',
        style: ['text', 'left'],
      },
      {
        text: 'c) vans – 10 passageiros para o embarque.',
        style: ['text', 'left'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Dezesseis: ', style: ['bold', 'text']},
          ' em caso de cancelamento de passeio de 01 (um) dia (“vai e volta” no mesmo dia), por parte do (a) (s) ',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ', por qualquer motivo, o valor a ser restituído por parte da ',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ' de acordo às condições de reembolso informadas no seu voucher.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Dezessete:', style: ['bold', 'text']},
          ' em caso de cancelamento de viagens com pernoite (hospedagem inclusa), por parte do (a) (s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ', por qualquer motivo, o valor a ser restituído por parte da ',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ' será de acordo às condições da rede de hotelaria e tarifa da passagem aérea informadas no voucher da reserva e no bilhete eletrônico.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Primeiro:', style: ['bold', 'text']},
          ' o cancelamento na data do embarque implicará no pagamento total dos serviços comprados, exceto no caso de fornecedores ainda não pagos ou de reembolso pelos fornecedores já pagos.',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Segundo:', style: ['bold', 'text']},
          ' o pedido de cancelamento somente será considerado se formalizado por escrito (e-mail) para oi@mrtravelandtours.com',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Dezoito:', style: ['bold', 'text']},
          ' além das multas e condições previstas nos casos de cancelamento/reembolso de cada serviço prestado, serão deduzidas as despesas de taxas de juros de cartão de crédito, taxas de intermediação de serviços de turismo, financiamento e multas cobradas pelos fornecedores (transportadoras, cias aéreas, receptivos, hotéis, restaurantes e outros serviços), devidamente comprovadas e que não foram passiveis de recuperação.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Dezenove: ', style: ['bold', 'text']},
          ' em caso de Alta Temporada (Feriados Nacionais, Carnaval, Réveillon) o percentual de desconto poderá ser maior de acordo com as regras dos fornecedores (hotéis, pousadas, empresa de transporte, cias aéreas) receptivo local).',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte: ', style: ['bold', 'text']},
          ' sem prejuízo das multas previstas nas alíneas anteriores, em se tratando de produtos internacionais que, como se sabe, não se sujeitam à lei brasileira, o (a) (s)',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ' é/são os responsável (eis) por ressarcir o terceiro prejudicado, a OPERADORA ou a própria ',
          {text: ' CONTRATADA ', style: ['bold', 'text']},
          ' das taxas, multas e qualquer outro valor pago pela sua desistência ou a de terceiros, ainda que estas sejam abusivas sob a ótica da legislação brasileira, ficando desde já ciente que em alguns casos elas podem ultrapassar ',
          {text: ' 50% (cinquenta por cento) ', style: ['bold', 'text']},
          ' ou mais do valor pago.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Primeiro: ', style: ['bold', 'text']},
          ' o reembolso dos valores será pago no prazo de até 30 (trinta) dias corridos a partir da data de confirmação do cancelamento por parte do (a) (s)',
          {text: ' CONTRATANTE (S).', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Segundo: ', style: ['bold', 'text']},
          ' para compras realizadas no cartão de crédito, o reembolso (estorno) será feito direto na fatura do cartão de crédito utilizado e será enviado o comprovante e para compras realizadas via boleto bancário ou em espécie pessoalmente na agência, será feito depósito bancário/DOC/PIX direto na conta corrente do (a) (s) ',
          {text: ' CONTRATANTE (S).', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte e Um: ', style: ['bold', 'text']},
          ' em acordo com o Artigo 49 do Código de Defesa do Consumidor, fica (m) o (a) (s) ',
          {text: ' CONTRATANTE (S)', style: ['bold', 'text']},
          ', cientes do direito de: ',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'O consumidor pode desistir do contrato, no prazo de sete dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou em domicílio.',
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Parágrafo Primeiro: ', style: ['bold', 'text']},
          ' Se o consumidor exercitar o direito de arrependimento previsto neste artigo, os valores eventualmente pagos, a qualquer título, durante o prazo de reflexão, serão devolvidos, de imediato, monetariamente atualizados. ',
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Segundo: ', style: ['bold', 'text']},
          ' o reembolso dos valores será pago no prazo de até 30 (trinta) dias corridos a partir da data de confirmação do cancelamento por parte do (a) (s) ',
          {text: ' CONTRATANTE (S). ', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      {
        text: [
          {text: 'Parágrafo Terceiro: ', style: ['bold', 'text']},
          ' para compras realizadas no cartão de crédito, o reembolso (estorno) será feito direto na fatura do cartão de crédito utilizado e será enviado o comprovante e para compras realizadas via boleto bancário ou em espécie pessoalmente na agência, será feito depósito bancário/DOC/PIX direto na conta corrente do (a) (s) ',
          {text: ' CONTRATANTE (S).', style: ['bold', 'text']},
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: ' NÃO FAZEMOS ALTERAÇÃO DE DATA DO PASSEIO / VIAGEM, COM MENOS DE 10 DIAS PARA A DATA DO EMBARQUE.',
        style: ['header', 'left', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte e Dois:', style: ['bold', 'text']},
          ' em caso de NO SHOW (Não comparecimento no dia do embarque) o (a) (s) ',
          {text: ' CONTRATANTE (S) ', style: ['bold', 'text']},
          ' não receberá (ão) qualquer restituição, bem como também não poderá solicitar que a ',
          {text: ' CONTRATADA ', style: ['bold', 'text']},
          ' reagende seu passeio/viagem para uma nova data. Por qualquer que seja o motivo/razão do não comparecimento no dia da sua viagem/passeio.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'DAS RECLAMAÇÕES',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte e Três: ', style: ['bold', 'text']},
          ' em caso de reclamações quanto à prestação de serviços, o (a) (s) ',
          {text: ' CONTRATANTE (S) ', style: ['bold', 'text']},
          ' as encaminhará por escrito a ',
          {text: ' CONTRATADA ', style: ['bold', 'text']},
          ' até 30 (trinta) dias após o encerramento dos mesmos, conforme Artigo 26, parágrafo 1° do Código de Defesa do Consumidor. Se não o fizer dentro do prazo estipulado, a relação contratual será considerada perfeita e acabada.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte e Quatro: ', style: ['bold', 'text']},
          ' em caso de deficiência no serviço prestado por terceiros, não diretamente pela ',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ', a reclamação deverá ser devidamente reportada, por escrito, ao prestador de serviço local, com devido protocolo. Uma cópia do documento, devidamente protocolada, deverá ser apresentada a ',
          {text: ' CONTRATADA ', style: ['bold', 'text']},
          ', juntamente com a reclamação, para que ela possa, mesmo não sendo sua obrigação legal, auxiliar o (a) (s) ',
          {text: ' CONTRATANTE (S) ', style: ['bold', 'text']},
          ' na obtenção de eventual indenização das perdas e danos.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'DAS DISPOSIÇÕES FINAIS E TRANSITÓRIAS',
        style: ['header', 'center', 'bold'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte e Cinco: ', style: ['bold', 'text']},
          ' o (a) (s) ',
          {text: ' CONTRATANTE (S)  ', style: ['bold', 'text']},
          ' e/ou demais passageiros que necessitarem de ajuda para se locomover ou de ajuda constante para qualquer necessidade ou dieta/alimentação especial ou ainda, na hipótese da viagem estar sendo realizada por motivos de saúde ou sendo ele portador de alguma doença grave ou que necessite atenção especial, portador de aparelhos de ajuda cardíaca, respiratória ou similar ou, ainda, na hipótese de gravidez deve declarar sua condição a ',
          {text: ' CONTRATADA ', style: ['bold', 'text']},
          ', no ato da solicitação de reserva, de forma a possibilitar à ',
          {
            text: ' MR TRAVEL & TOURS LTDA',
            style: ['bold', 'text'],
          },
          ' a aquisição de serviços que melhor atendam às suas necessidades.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          {text: 'Cláusula Vinte e Seis: ', style: ['bold', 'text']},
          ' fica eleito o foro da comarca da Cidade de Fortaleza/CE, com renúncia expressa de qualquer outro, por mais privilegiado que seja como único competente para dirimir quaisquer dúvidas, disputas e controvérsias oriundas do presente contrato, seus termos e condições.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: [
          'O (A) (s) ',
          {text: ' CONTRATANTE (S)  ', style: ['bold', 'text']},
          ' declara (m), neste momento que está de ACORDO com as cláusulas descritas neste presente contrato, ter lido e, por isso, conhecer e aceitar integralmente todas as suas cláusulas específicas e gerais, bem assim as especificações contratuais de pagamento constantes neste Contrato, declarando ainda, serem verdadeiras todas as informações prestadas a ',
          {text: ' CONTRATADA', style: ['bold', 'text']},
          ', assumindo de livre e espontânea vontade, todas as responsabilidades previstas neste contrato.',
        ],
        style: ['text', 'justify'],
      },
      ' ',
      {
        text: 'O presente contrato é irrevogável e irretratável e deverá ser respeitado pelas partes contratantes, seus herdeiros e sucessores, em todas as suas cláusulas e condições.',
        style: ['text', 'justify', 'bold'],
      },
      ' ',
      ' ',
      {
        text: `Fortaleza/CE, ${(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())} de ${months[date.getMonth()]} de ${date.getFullYear()} `,
        style: ['text', 'left'],
      },
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      '_____________________________________________',
      'MR TRAVEL & TOURS LTDA',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      '_____________________________________________',
      `${data.name_client}`,
    ],
    styles: {
      header: {
        fontSize: 12,
      },
      text: {
        fontSize: 11,
      },
      center: {
        alignment: 'center',
      },
      bold: {
        bold: true,
      },
      justify: {
        alignment: 'justify',
      },
      textSm: {
        fontSize: 10,
      },
      italics: {
        italics: true,
      },
      left: {
        alignment: 'left',
      },
      rigth: {
        alignment: 'rigth',
      },
      underlined: {
        decoration: 'underline',
      },
    },
  };
};

const payment = (pdfStore) => {
  return pdfStore.reservations.map((val) => {
    if (val.paymentSelect === 'C') {
      return {
        text: `Entrada de R$ ${val.primeiraParcela} (reais), paga em ${
          val.dateTransaction
        } e mais ${val.numberParcels - 1} parcelas de R$ ${
          val.restosParcelas
        } (reais) correspondente ao bilhete ${
          val.route
        }. As parcelas serão pagadas cada mês de acordo ao fechamento da fatura do cartão.`,
        style: ['text', 'justify'],
      };
    } else {
      return {
        text: `Entrada de R$ ${val.transaction_value} (reais), paga em ${val.dateTransaction} correspondente ao bilhete ${val.route}`,
        style: ['text', 'justify'],
      };
    }
  });
};

const provisionServices = (pdfStore) => {
  return pdfStore.reservations.map((val, index) => {
    return [
      {
        text: `${index + 1}.  Compra de passagens para: ${val.route}`,
        colSpan: 4,
      },
      {},
      {},
      {},
    ];
  });
};

const table = (pdfStore) => {
  return {
    layout: '',
    table: {
      widths: ['*', 'auto', '*', 'auto'],

      body: provisionServices(pdfStore),
    },
  };
};

export default pdfCreatorContract;
