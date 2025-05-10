"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";

export default function TopUpPage() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("237");
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^237\d*$/.test(value)) {
      setPhoneNumber(value);
    } else if (value === "") {
      setPhoneNumber("237");
    }
  };

  const handleTopUp = async () => {
    if (!phoneNumber || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter both phone number and amount",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format
    if (!/^237\d{9}$/.test(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Must be 237 followed by 9 digits (12 total)",
        variant: "destructive",
      });
      return;
    }

    // Validate amount
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (amountValue <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (amountValue < 100) {
      toast({
        title: "Minimum Amount",
        description: "Minimum purchase is XAF 100 (100 AFC)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const formattedAmount = amountValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      toast({
        title: "Purchase Successful!",
        description: (
          <div className="flex flex-col gap-1">
            <p>
              You've purchased{" "}
              <span className="font-bold">{formattedAmount} AFC</span>
            </p>
            <p>
              Paid: <span className="font-bold">{formattedAmount} XAF</span>
            </p>
          </div>
        ),
      });

      // Reset form
      setAmount("");
      setPhoneNumber("237");

      // Redirect with success state
      window.location.href = `/dashboard?topup=success&amount=${formattedAmount}`;
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description:
          error instanceof Error ? error.message : "Transaction failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Buy AFC Cryptocurrency</CardTitle>
            <CardDescription>
              Convert XAF to AFC at 1:1 rate via Mobile Money
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Money Number</Label>
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
                Cameroon number format: 237 followed by 9 digits
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Spend (XAF)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">XAF</span>
                </div>
                <Input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="pl-12"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>You'll receive: {amount || "0"} AFC</span>
                <span>Minimum: 100 XAF</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full"
                onClick={handleTopUp}
                disabled={
                  isLoading ||
                  !phoneNumber ||
                  !amount ||
                  phoneNumber.length !== 12 ||
                  parseFloat(amount) < 100
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Buy AFC
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span>1.</span>
              <span>Enter your mobile money number and amount in XAF</span>
            </li>
            <li className="flex items-start gap-2">
              <span>2.</span>
              <span>Confirm the Mobile Money payment request</span>
            </li>
            <li className="flex items-start gap-2">
              <span>3.</span>
              <span>Receive equal amount in AFC instantly</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}
