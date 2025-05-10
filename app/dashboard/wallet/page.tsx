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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Copy, DollarSign, Plus, Send } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default function WalletPage() {
  const [balance] = useState("1,250.00");
  const [currency] = useState("XAF");
  const [walletAddress] = useState("0x1a2b3c4d5e6f7g8h9i0j");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
  };

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

        {/* Wallet Address */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Address</CardTitle>
            <CardDescription>
              Your unique wallet address for receiving funds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <code className="text-sm font-mono truncate">
                {walletAddress}
              </code>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy wallet address</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Activity</CardTitle>
            <CardDescription>
              Recent transactions and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transactions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions" className="pt-4 space-y-4">
                <TransactionItem
                  type="received"
                  name="John Doe"
                  amount="250.00"
                  currency="XAF"
                  date="Today, 10:30 AM"
                  status="completed"
                />
                <TransactionItem
                  type="sent"
                  name="Jane Smith"
                  amount="500.00"
                  currency="XAF"
                  date="Yesterday, 3:45 PM"
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
                <TransactionItem
                  type="sent"
                  name="Michael Johnson"
                  amount="300.00"
                  currency="XAF"
                  date="May 5, 2025"
                  status="pending"
                />
              </TabsContent>
              <TabsContent value="activity" className="pt-4 space-y-4">
                <ActivityItem
                  action="Login"
                  details="New login from Chrome on Windows"
                  date="Today, 9:15 AM"
                />
                <ActivityItem
                  action="Password Changed"
                  details="Password was successfully updated"
                  date="May 6, 2025"
                />
                <ActivityItem
                  action="KYC Verified"
                  details="Your identity verification was completed"
                  date="May 3, 2025"
                />
                <ActivityItem
                  action="Account Created"
                  details="Welcome to AfriPay!"
                  date="May 1, 2025"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Wallet Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Settings</CardTitle>
            <CardDescription>Manage your wallet preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
              <div>
                <p className="font-medium">Default Currency</p>
                <p className="text-sm text-muted-foreground">
                  Set your preferred currency
                </p>
              </div>
              <Badge variant="outline">{currency}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
              <div>
                <p className="font-medium">Transaction Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about wallet activities
                </p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                <span
                  className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition-all"
                  style={{ transform: "translateX(100%)" }}
                ></span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                <span className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition-all"></span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Advanced Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}

interface TransactionItemProps {
  type: "sent" | "received" | "topup" | "withdraw";
  name: string;
  amount: string;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

function TransactionItem({
  type,
  name,
  amount,
  currency,
  date,
  status,
}: TransactionItemProps) {
  const getIcon = () => {
    switch (type) {
      case "sent":
        return <ArrowUp className="h-4 w-4" />;
      case "received":
        return <ArrowDown className="h-4 w-4" />;
      case "topup":
        return <Plus className="h-4 w-4" />;
      case "withdraw":
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "failed":
        return "bg-destructive/10 text-destructive";
    }
  };

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
            <Badge
              variant="outline"
              className={`text-[10px] px-1 py-0 h-4 ${getStatusColor()}`}
            >
              {status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-medium ${
            type === "sent" || type === "withdraw"
              ? "text-destructive"
              : "text-success"
          }`}
        >
          {type === "sent" || type === "withdraw" ? "-" : "+"}
          {currency} {amount}
        </p>
        <p className="text-xs text-muted-foreground">
          {type === "sent"
            ? "Sent"
            : type === "received"
            ? "Received"
            : type === "topup"
            ? "Top Up"
            : "Withdrawal"}
        </p>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  action: string;
  details: string;
  date: string;
}

function ActivityItem({ action, details, date }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transaction-item">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">{action}</p>
          <p className="text-xs text-muted-foreground">{details}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
