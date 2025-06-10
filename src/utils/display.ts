/**
 *
 * 若 value 为 null、undefined、空串等，则返回 '-'
 * 否则返回 value 本身
 */
export function displayValue<T>(val: T): string {
  if (val === null || val === undefined || val === '')
    return '-'

  return String(val)
}
