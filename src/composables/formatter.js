export function useFormatterDateWooba(value) {
  const splitDate = value.split('/');
  return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
}

export function useFormatterDate(value) {
  const splitDate = value.split('/');
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
}
