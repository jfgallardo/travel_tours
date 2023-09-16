function formatInputCpf(el) {
  let input = el.getElementsByTagName('input')[0];
  let value = input.value;
  value = value.replace(/\D/g, '');
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  if (value !== input.value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function formatInputCep(el) {
  let input = el.getElementsByTagName('input')[0];
  let value = input.value;
  value = value.replace(/\D/g, '');
  if (value.length > 8) {
    value = value.slice(0, 8);
  }
  value = value.replace(/^(\d{5})(\d{3})$/, '$1-$2');

  if (value !== input.value) {
    input.value = value;  
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function formatInputPhone(el) { 
  let input = el.getElementsByTagName('input')[0];
  let value = input.value;
  value = value.replace(/\D/g, '');
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');

  if (value !== input.value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function formatInputOnlyPhone(el) { 
  let input = el.getElementsByTagName('input')[0];
  let value = input.value;
  value = value.replace(/\D/g, '');
  if (value.length > 9) {
    value = value.slice(0, 9);
  }
  value = value.replace(/^(\d{5})(\d{4})$/, '$1-$2');

  if (value !== input.value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function formatInputNumberCard(el) {
  let input = el.getElementsByTagName('input')[0];
  let value = input.value;
  value = value.replace(/\D/g, '');
  if (value.length > 16) {
    value = value.slice(0, 16);
  }
  value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');

  if (value !== input.value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function formatInputCvc(el) {
    const input = el.getElementsByTagName('input')[0];
    let value = input.value;
    value = value.replace(/\D/g, '');

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value !== input.value) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

function formatExpirationCard(el) {
  const input = el.getElementsByTagName('input')[0];
  let value = input.value;
  value = value.replace(/\D/g, ''); //only number

  if (value.length > 6) {
    value = value.slice(0, 6);
  }

  if (value.length === 4) {
    value = value.replace(/(\d{2})(\d{2})/, '$1/$2');    
  }

  if (value.length === 6) {
    value = value.replace(/(\d{2})(\d{4})/, '$1/$2');    
  }

  if (value !== input.value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

export const cpfDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInputCpf(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInputCpf(el));
  },
};

export const cepDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInputCep(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInputCep(el));
  },
};

export const phoneDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInputPhone(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInputPhone(el));
  },
};

export const onlyPhoneDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInputOnlyPhone(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInputOnlyPhone(el));
  },
};

export const numberCardDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInputNumberCard(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInputNumberCard(el));
  },
};


export const cvcDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInputCvc(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInputCvc(el));
  },
};

export const expirationCardDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatExpirationCard(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatExpirationCard(el));
  },
};
