export function useFormatterDateWooba(value) {
  const splitDate = value.split('/');
  return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
}
