"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import { AuthHeader } from "@/components/auth-header";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [verificationMethod, setVerificationMethod] = useState<
    "email" | "phone"
  >("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateStep1 = () => {
    const newErrors = {
      firstName: !formData.firstName ? "First name is required" : "",
      lastName: !formData.lastName ? "Last name is required" : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Valid email required"
        : "",
      phone: !/^\+?[1-9]\d{1,14}$/.test(formData.phone)
        ? "Valid phone number required"
        : "",
      password: formData.password.length < 8 ? "Minimum 8 characters" : "",
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords must match"
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleContinue = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              {step === 1 && "Enter your details to create your account"}
              {step === 2 && "Verify your identity to secure your account"}
              {step === 3 &&
                "Set up your wallet to start sending and receiving money"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+237 123 456 789"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Keep existing Step 2 and 3 content unchanged */}
            {step === 2 && (
              <div className="space-y-4">
                <Tabs
                  defaultValue="email"
                  onValueChange={(value) =>
                    setVerificationMethod(value as "email" | "phone")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                  </TabsList>
                  <TabsContent value="email" className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Verification code sent to john.doe@example.com
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-code">
                        Enter verification code
                      </Label>
                      <div className="grid grid-cols-6 gap-2">
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                      </div>
                    </div>
                    <Button variant="link" className="px-0">
                      Resend code
                    </Button>
                  </TabsContent>
                  <TabsContent value="phone" className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Verification code sent to +237 123 456 789
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-code">
                        Enter verification code
                      </Label>
                      <div className="grid grid-cols-6 gap-2">
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                        <Input className="text-center" maxLength={1} />
                      </div>
                    </div>
                    <Button variant="link" className="px-0">
                      Resend code
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">Account created successfully!</p>
                    <p className="text-sm text-muted-foreground">
                      Your wallet is ready to use
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country of residence</Label>
                  <select
                    id="country"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your country</option>
                    <option value="cm">Cameroon</option>
                    <option value="ng">Nigeria</option>
                    <option value="gh">Ghana</option>
                    <option value="ke">Kenya</option>
                    <option value="za">South Africa</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Preferred currency</Label>
                  <select
                    id="currency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your preferred currency</option>
                    <option value="xaf">CFA Franc (XAF)</option>
                    <option value="ngn">Nigerian Naira (NGN)</option>
                    <option value="ghs">Ghanaian Cedi (GHS)</option>
                    <option value="kes">Kenyan Shilling (KES)</option>
                    <option value="zar">South African Rand (ZAR)</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleContinue}>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
