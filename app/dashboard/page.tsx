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
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Plus,
  RefreshCw,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { TransactionItem } from "@/components/transaction-item";

export const dynamic = "force-dynamic";

type TransactionType = "sent" | "received" | "topup" | "withdraw";
type TransactionStatus = "completed" | "pending" | "failed";

interface TransactionItemProps {
  type: TransactionType;
  name: string;
  amount: string;
  currency: string;
  date: string;
  status: TransactionStatus;
}

export default function DashboardPage() {
  const [balance] = useState("1,250.00");
  const [currency] = useState("XAF");

  const initialTransactions: TransactionItemProps[] = [
    {
      type: "received",
      name: "Glenn Tanze",
      amount: "250.00",
      currency: "XAF",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "completed",
    },
    {
      type: "sent",
      name: "Angelo",
      amount: "500.00",
      currency: "XAF",
      date: new Date(Date.now() - 86400000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "completed",
    },
    {
      type: "sent",
      name: "Joshua",
      amount: "100.00",
      currency: "XAF",
      date: new Date(Date.now() - 86400000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "completed",
    },
  ];

  const searchParams = useSearchParams();
  const [transactions, setTransactions] =
    useState<TransactionItemProps[]>(initialTransactions);

  useEffect(() => {
    if (searchParams.get("topup") === "success") {
      const amount = searchParams.get("amount") || "0.00";

      setTransactions((prev) => [
        {
          type: "topup",
          name: "Mobile Money Top-Up",
          amount,
          currency: "XAF",
          date: new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
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
            <Button size="sm" variant="secondary" className="flex-1" asChild>
              <Link href="/dashboard/receive">
                <ArrowDown className="mr-2 h-4 w-4" />
                Receive
              </Link>
            </Button>
            <Button size="sm" variant="secondary" className="flex-1" asChild>
              <Link href="/dashboard/send">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Link>
            </Button>
            <Button size="sm" variant="secondary" className="flex-1" asChild>
              <Link href="/dashboard/top-up">
                <Plus className="mr-2 h-4 w-4" />
                Top Up
              </Link>
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
                {transactions
                  .filter((t) => t.type === "sent")
                  .map((transaction, index) => (
                    <TransactionItem key={index} {...transaction} />
                  ))}
              </TabsContent>
              <TabsContent value="received" className="pt-4 space-y-4">
                {transactions
                  .filter((t) => t.type === "received" || t.type === "topup")
                  .map((transaction, index) => (
                    <TransactionItem key={index} {...transaction} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/transactions">View All Transactions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
