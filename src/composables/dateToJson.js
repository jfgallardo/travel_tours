export function useDateToJson(value) {
  const splitDate = value.split('/');
  const dateToTransform = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
  return `/Date(${new Date(dateToTransform).getTime()})/`;
}
