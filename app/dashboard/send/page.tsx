"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { ArrowRight, Loader2 } from "lucide-react";

export default function SendMoneyPage() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("237");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMoney = async () => {
    if (!phoneNumber || !amount) return;

    // Validate phone number format
    if (!/^237\d{9}$/.test(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description:
          "Phone number must be in format 237XXXXXXXXX (12 digits total)",
        variant: "destructive",
      });
      return;
    }

    // Validate amount
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // ⚠️ Replace this with serverless call in production!
      const response = await fetch("https://api.pay.mynkwa.com/collect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "icYr-bl2F2-zJteGZ77eO", // ⚠️ NEVER expose in production
        },
        body: JSON.stringify({
          amount: Math.round(Number(amount) * 100),
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      toast({
        title: "Payment Successful!",
        description: `XAF ${amount} sent to ${phoneNumber}`,
      });

      setAmount("");
      setPhoneNumber("237");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^237\d*$/.test(value) || value === "") {
      setPhoneNumber(value);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>
              Send money to any phone number in Cameroon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Recipient Phone Number</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">+</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="237XXXXXXXXX"
                  className="pl-8"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={12}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Format: 237 followed by 9 digits (e.g., 237650000000)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (XAF)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSendMoney}
              disabled={
                isLoading ||
                !phoneNumber ||
                !amount ||
                phoneNumber.length !== 12
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Money
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
