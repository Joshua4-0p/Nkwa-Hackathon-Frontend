// app/dashboard/top-up/page.tsx

"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Loader2, Phone, Wallet } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"

export default function TopUpPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("+237");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    amount: "",
  });

  const validatePhone = (phone: string) => {
    const cameroonRegex = /^\+237[6-8]\d{7,8}$/;
    return cameroonRegex.test(phone);
  };

  const validateAmount = (amount: string) => {
    const value = Number(amount);
    return !isNaN(value) && value >= 100 && value <= 1000000;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      phone: validatePhone(phone) ? "" : "Invalid Cameroon phone number",
      amount: validateAmount(amount) ? "" : "Amount must be at least XAF 100",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setLoading(true);

    // Simulate API call and payment processing
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard?topup=success&amount=" + amount);
    }, 2000);
  };

  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto py-8"
      >
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Top Up Wallet</h1>
        </div>

        <Card className="bg-gradient-to-br from-primary to-primary/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary-foreground">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background"
                  />
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-primary-foreground">
                  Amount (XAF)
                </Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    className="bg-background"
                  />
                  <Wallet className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.amount && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.amount}
                  </motion.p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  <>
                    Confirm Top-Up
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Supported mobile money providers:</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-muted rounded-md">
              MTN Mobile Money
            </span>
            <span className="px-2 py-1 bg-muted rounded-md">Orange Money</span>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
