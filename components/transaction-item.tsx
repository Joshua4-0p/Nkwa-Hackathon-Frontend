// components/transaction-item.tsx

"use client";
import { ArrowUp, ArrowDown, Plus, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TransactionItemProps {
  type: "sent" | "received" | "topup" | "withdraw";
  name: string;
  amount: string;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export function TransactionItem({
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
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
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
