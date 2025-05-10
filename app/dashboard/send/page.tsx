"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, ChevronRight, Search, User } from "lucide-react"
import { useState } from "react"

export default function SendMoneyPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")

  return (
    <DashboardShell>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>Send money to friends, family, or businesses across Africa</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="new">New Recipient</TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact" className="space-y-4 pt-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search contacts..." className="pl-8" />
                    </div>
                    <div className="space-y-2">
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => setRecipient("John Doe")}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">+237 123 456 789</p>
                        </div>
                        {recipient === "John Doe" && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => setRecipient("Jane Smith")}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-xs text-muted-foreground">+234 987 654 321</p>
                        </div>
                        {recipient === "Jane Smith" && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => setRecipient("Michael Johnson")}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Michael Johnson</p>
                          <p className="text-xs text-muted-foreground">+233 456 789 123</p>
                        </div>
                        {recipient === "Michael Johnson" && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="new" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Recipient Name</Label>
                      <Input id="name" placeholder="Enter recipient name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select recipient country</option>
                        <option value="cm">Cameroon</option>
                        <option value="ng">Nigeria</option>
                        <option value="gh">Ghana</option>
                        <option value="ke">Kenya</option>
                        <option value="za">South Africa</option>
                      </select>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-muted/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{recipient}</p>
                    <p className="text-xs text-muted-foreground">+237 123 456 789</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">XAF</span>
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-12"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input id="note" placeholder="What's this for?" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Recipient</span>
                    <span className="font-medium">{recipient}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">XAF {amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-medium">XAF 10.00</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">XAF {Number.parseFloat(amount) + 10}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
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
              <Button
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !recipient) || (step === 2 && !amount)}
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => alert("Transaction successful!")}>
                Confirm and Send
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
