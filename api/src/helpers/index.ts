export function isNumber(value) {
  return !isNaN(value) && Number.isFinite(value);
}
