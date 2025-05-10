// app/auth/forgot-password/page.tsx

"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Mail, ArrowRight, Loader2, CheckCircle, Lock } from "lucide-react"
import { AuthHeader } from "@/components/auth-header"

// Step 1: Email Entry
function EmailStep({ nextStep }: { nextStep: () => void }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      nextStep()
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <p className="text-muted-foreground">
          Enter your email to receive a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            placeholder="john.doe@example.com"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Login here
        </Link>
      </div>
    </motion.div>
  )
}

// Step 2: Email Sent Confirmation
function ConfirmationStep() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-center space-y-6"
    >
      <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-success" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Check Your Email</h1>
        <p className="text-muted-foreground">
          We've sent a password reset link to your email address
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        Didn't receive the email?{" "}
        <button className="text-primary hover:underline">Resend</button>
      </div>
    </motion.div>
  )
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-2 bg-blue-50/50 border-b">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <Lock className="h-4 w-4" />
              <span>Secure Password Reset</span>
            </div>
          </div>

          <div className="p-8">
            {step === 1 ? (
              <EmailStep nextStep={() => setStep(2)} />
            ) : (
              <ConfirmationStep />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}