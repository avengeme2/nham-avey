export const getDomainFromEmail = (email: string) => {
  return email.replace(/.*@/, '')
}
