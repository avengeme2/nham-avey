//  support unicode characters
const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

export const initials = (name?: string): string => {
  if (!name) return ''
  const initials = [...name.matchAll(rgx)] || []
  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase()
}
