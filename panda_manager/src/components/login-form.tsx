'use client'

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  onSuccessfulLogin?: () => void
}

export function LoginForm({ onSuccessfulLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent, loginMethod: 'credentials' | 'google' = 'credentials') => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (loginMethod === 'google') {
        // Google Sign-In
        const result = await signIn('google', { 
          redirect: false,
          callbackUrl: '/home'
        })

        if (result?.error) {
          setError("Failed to sign in with Google")
        } else {
          router.push('/home')
          onSuccessfulLogin?.()
        }
      } else {
        // Email/Password Sign-In
        console.log("Logging in with:", email, password)
        
        // Example of using NextAuth for credentials login (if you have it set up)
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password
        })

        if (result?.error) {
          setError("Invalid email or password")
        } else {
          router.push('/home')
          onSuccessfulLogin?.()
        }
      }
    } catch (error) {
      setError("An unexpected error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e, 'credentials')}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={(e) => handleSubmit(e, 'google')}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login with Google"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}