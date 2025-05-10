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
import { DashboardShell } from "@/components/dashboard-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Check,
  ChevronRight,
  FileText,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState<
    "unverified" | "pending" | "verified"
  >("unverified");

  return (
    <DashboardShell>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Identity Verification (KYC)</CardTitle>
            <CardDescription>
              Complete your identity verification to unlock all features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verificationStatus === "unverified" && (
              <>
                <div className="mb-6 p-4 border rounded-lg bg-muted/50 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Verification Required</p>
                    <p className="text-sm text-muted-foreground">
                      Complete the verification process to unlock all features
                    </p>
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Legal Name</Label>
                      <Input
                        id="full-name"
                        placeholder="Enter your full name as it appears on your ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <select
                        id="nationality"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select your nationality</option>
                        <option value="cm">Cameroon</option>
                        <option value="ng">Nigeria</option>
                        <option value="gh">Ghana</option>
                        <option value="ke">Kenya</option>
                        <option value="za">South Africa</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Residential Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <Tabs defaultValue="national-id">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="national-id">
                          National ID
                        </TabsTrigger>
                        <TabsTrigger value="passport">Passport</TabsTrigger>
                        <TabsTrigger value="drivers-license">
                          Driver's License
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="national-id"
                        className="space-y-4 pt-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="id-number">National ID Number</Label>
                          <Input
                            id="id-number"
                            placeholder="Enter your ID number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>ID Front Side</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Upload Front Side
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or PDF, max 5MB
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>ID Back Side</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Upload Back Side
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or PDF, max 5MB
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="passport" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="passport-number">
                            Passport Number
                          </Label>
                          <Input
                            id="passport-number"
                            placeholder="Enter your passport number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Passport Photo Page</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Upload Passport Page
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or PDF, max 5MB
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="drivers-license"
                        className="space-y-4 pt-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="license-number">
                            Driver's License Number
                          </Label>
                          <Input
                            id="license-number"
                            placeholder="Enter your license number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>License Front Side</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Upload Front Side
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or PDF, max 5MB
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>License Back Side</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Upload Back Side
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or PDF, max 5MB
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Selfie Verification</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                        <User className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">Upload Selfie</p>
                        <p className="text-xs text-muted-foreground">
                          Take a clear photo of your face
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+237 123 456 789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">Terms and Conditions</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        By submitting your information, you agree to our terms
                        and conditions and privacy policy.
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="agree"
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="agree" className="text-sm">
                          I agree to the terms and conditions
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {verificationStatus === "pending" && (
              <div className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-warning/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-warning"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Verification in Progress</h3>
                <p className="text-muted-foreground">
                  We're currently reviewing your information. This process
                  typically takes 24-48 hours.
                </p>
                <div className="w-full bg-muted rounded-full h-2.5 mt-4">
                  <div className="bg-warning h-2.5 rounded-full w-1/2 shimmer"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You'll receive a notification once the verification is
                  complete.
                </p>
              </div>
            )}

            {verificationStatus === "verified" && (
              <div className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-bold">Verification Complete</h3>
                <p className="text-muted-foreground">
                  Your identity has been successfully verified. You now have
                  full access to all features.
                </p>
                <div className="w-full bg-muted rounded-full h-2.5 mt-4">
                  <div className="bg-success h-2.5 rounded-full w-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">Transaction Limit</p>
                    <p className="text-xl font-bold">XAF 5,000,000</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">Verification Level</p>
                    <p className="text-xl font-bold">Level 2</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {verificationStatus === "unverified" && (
              <>
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={() => setStep(step + 1)}>
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => setVerificationStatus("pending")}>
                    Submit for Verification
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </>
            )}
            {verificationStatus === "pending" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setVerificationStatus("verified")}
              >
                Check Status
              </Button>
            )}
            {verificationStatus === "verified" && (
              <Button className="w-full" asChild>
                <a href="/dashboard">Return to Dashboard</a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
