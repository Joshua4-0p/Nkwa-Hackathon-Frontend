import Link from "next/link"

export function AuthHeader() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">A</span>
          </div>
          <span className="font-bold text-xl">AfriPay</span>
        </Link>
      </div>
    </header>
  )
}
