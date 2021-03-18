export function formatMoney(nominal: number) {
  if (!nominal) return ''
  return formatNumber(nominal + '') + '.00'
}

export function formatNumber(number: string) {
  if (!number) return number
  let numString = number + ''
  let [numberString, dec] = numString.split('.', 2)
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${numberString}${
    dec
      ? `.${dec.substr(0, 4)}`
      : numString[numString.length - 1] === '.'
      ? '.'
      : ''
  }`
}

export function deformatNumber(text: string) {
  let replaced = text.replace(/,/g, '')
  if (replaced === '') return replaced
  const [, dec] = replaced.split('.')

  if (dec && dec.length > 4) {
    replaced = replaced.substr(0, replaced.length - 1)
  }
  return replaced
}
