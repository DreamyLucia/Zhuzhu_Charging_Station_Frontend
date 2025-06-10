export const formatDate = (str: string) => {
  if (!str)
    return ''
  return str.replace('T', ' ').split('.')[0]
}
