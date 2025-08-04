import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Logo({ className = "" }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the standard md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Link href="/" className={`block ${className}`}>
      <Image
        src={isMobile ? "/images/White1Logo.svg" : "/images/header-logo.png"}
        alt="Beyond Experiences Logo"
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  )
}
