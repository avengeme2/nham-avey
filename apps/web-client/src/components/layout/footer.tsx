import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container footer mx-auto grid-cols-2 p-10 px-8">
        <div>
          <span className="footer-title">Services</span>
          <Link href="#" className="link-hover link">
            Branding
          </Link>
          <Link href="#" className="link-hover link">
            Design
          </Link>
          <Link href="#" className="link-hover link">
            Marketing
          </Link>
          <Link href="#" className="link-hover link">
            Advertisement
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link href="#" className="link-hover link">
            About us
          </Link>
          <Link href="#" className="link-hover link">
            Contact
          </Link>
          <Link href="#" className="link-hover link">
            Jobs
          </Link>
          <Link href="#" className="link-hover link">
            Press kit
          </Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link href="#" className="link-hover link">
            Terms of use
          </Link>
          <Link href="#" className="link-hover link">
            Privacy policy
          </Link>
          <Link href="#" className="link-hover link">
            Cookie policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
