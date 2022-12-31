import Link from 'next/link'

export const LogoLink = () => {
  return (
    <Link href="/" className="h-[90%] pl-0 text-xl normal-case">
      <img
        className="h-full object-contain"
        src="/images/logo.png"
        alt="Nham avey logo"
      />
    </Link>
  )
}

export default LogoLink
