export const CREATE_ORDER_FORM_ERRORS = Object.freeze({
  paymentMethod: {
    errors: ['required'],
    messages: ['O método de pagamento não pode ser nulo'],
  },
  value: {
    errors: ['required', 'min', 'max'],
    messages: [
      'O valor não pode ser nulo',
      'O valor não pode ser menor que 10',
      'O valor não pode ser menor que 40',
    ],
  },
});
