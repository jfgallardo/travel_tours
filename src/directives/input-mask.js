function formatInput(el) {
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

export const cpfDirective = {
  beforeMount(el, binding) {
    let input = el.getElementsByTagName('input')[0];
    input.addEventListener('input', () => {
      formatInput(el);
      binding.value = input.value;
    });
  },
  unmounted(el) {
    let input = el.getElementsByTagName('input')[0];
    input.removeEventListener('input', () => formatInput(el));
  },
};
