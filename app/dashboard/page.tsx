"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowDown, ArrowUp, DollarSign, Plus, RefreshCw, Send } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const [balance] = useState("1,250.00");
  const [currency] = useState("XAF");
  const initialTransactions = [
    {
      type: "received" as const,
      name: "John Doe",
      amount: "250.00",
      currency: "XAF",
      date: "Today, 10:30 AM",
      status: "completed" as const,
    },
    {
      type: "sent" as const,
      name: "Jane Smith",
      amount: "500.00",
      currency: "XAF",
      date: "Yesterday, 3:45 PM",
      status: "completed" as const,
    },
    // Add other initial transactions here...
  ];

  // Add this to your dashboard page
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState<TransactionItemProps[]>(initialTransactions);

  useEffect(() => {
    if (searchParams.get("topup") === "success") {
      const amount = searchParams.get("amount");

      setTransactions((prev) => [
        {
          type: "topup",
          name: "Mobile Money Top-Up",
          amount: amount || "0.00",
          currency: "XAF",
          date: new Date().toLocaleDateString(),
          status: "completed",
        },
        ...prev,
      ]);

      // Clear the search params after processing
      const url = new URL(window.location.href);
      url.searchParams.delete("topup");
      url.searchParams.delete("amount");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [searchParams]);

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Wallet Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Your Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold">
                {currency} {balance}
              </div>
              <p className="text-primary-foreground/80">Available balance</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1">
              <ArrowDown className="mr-2 h-4 w-4" />
              Receive
            </Button>
            <Button size="sm" variant="secondary" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
            <Button size="sm" variant="secondary" className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Top Up
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/send">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Send Money</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/receive">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <ArrowDown className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Receive Money</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/top-up">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Top Up</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/withdraw">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Withdraw</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4 space-y-4">
                {transactions.map((transaction, index) => (
                  <TransactionItem key={index} {...transaction} />
                ))}
              </TabsContent>
              <TabsContent value="sent" className="pt-4 space-y-4">
                <TransactionItem
                  type="sent"
                  name="Jane Smith"
                  amount="500.00"
                  currency="XAF"
                  date="Yesterday, 3:45 PM"
                  status="completed"
                />
                <TransactionItem
                  type="sent"
                  name="Michael Johnson"
                  amount="300.00"
                  currency="XAF"
                  date="May 5, 2025"
                  status="pending"
                />
              </TabsContent>
              <TabsContent value="received" className="pt-4 space-y-4">
                <TransactionItem
                  type="received"
                  name="John Doe"
                  amount="250.00"
                  currency="XAF"
                  date="Today, 10:30 AM"
                  status="completed"
                />
                <TransactionItem
                  type="topup"
                  name="NkwaPay"
                  amount="1,000.00"
                  currency="XAF"
                  date="May 7, 2025"
                  status="completed"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/transactions">View All Transactions</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Exchange Rates */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Exchange Rates</CardTitle>
            <CardDescription>
              Current rates for popular currencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">XAF</span>
                  </div>
                  <div>
                    <p className="font-medium">CFA Franc</p>
                    <p className="text-xs text-muted-foreground">Cameroon</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">1.00</p>
                  <div className="flex items-center text-xs text-success">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Base currency
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">NGN</span>
                  </div>
                  <div>
                    <p className="font-medium">Nigerian Naira</p>
                    <p className="text-xs text-muted-foreground">Nigeria</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">0.45</p>
                  <div className="flex items-center text-xs text-success">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +0.02 (4.6%)
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">GHS</span>
                  </div>
                  <div>
                    <p className="font-medium">Ghanaian Cedi</p>
                    <p className="text-xs text-muted-foreground">Ghana</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">0.12</p>
                  <div className="flex items-center text-xs text-destructive">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    -0.01 (7.7%)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

interface TransactionItemProps {
  type: "sent" | "received" | "topup" | "withdraw"
  name: string
  amount: string
  currency: string
  date: string
  status: "completed" | "pending" | "failed"
}

function TransactionItem({ type, name, amount, currency, date, status }: TransactionItemProps) {
  const getIcon = () => {
    switch (type) {
      case "sent":
        return <ArrowUp className="h-4 w-4" />
      case "received":
        return <ArrowDown className="h-4 w-4" />
      case "topup":
        return <Plus className="h-4 w-4" />
      case "withdraw":
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success"
      case "pending":
        return "bg-warning/10 text-warning"
      case "failed":
        return "bg-destructive/10 text-destructive"
    }
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transaction-item">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            type === "sent"
              ? "bg-destructive/10 text-destructive"
              : type === "received"
                ? "bg-success/10 text-success"
                : "bg-primary/10 text-primary"
          }`}
        >
          {getIcon()}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{date}</span>
            <Badge variant="outline" className={`text-[10px] px-1 py-0 h-4 ${getStatusColor()}`}>
              {status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${type === "sent" || type === "withdraw" ? "text-destructive" : "text-success"}`}>
          {type === "sent" || type === "withdraw" ? "-" : "+"}
          {currency} {amount}
        </p>
        <p className="text-xs text-muted-foreground">
          {type === "sent" ? "Sent" : type === "received" ? "Received" : type === "topup" ? "Top Up" : "Withdrawal"}
        </p>
      </div>
    </div>
  )
}
