const LOCALE = 'en-US'

export function formatDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString(LOCALE, { year: 'numeric', month: 'long' })
}

export function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`
}
