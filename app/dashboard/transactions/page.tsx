// app/dashboard/transactions/page.tsx

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { TransactionItem } from "../../../components/transaction-item";
import {
  Search,
  ArrowDown,
  ArrowUp,
  Download,
  Printer,
  ListFilter,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const transactions = [
  // Sample data - replace with real data
  {
    id: "1",
    type: "received",
    name: "John Doe",
    amount: "250.00",
    currency: "XAF",
    date: "Today, 10:30 AM",
    status: "completed",
  },
  {
    id: "2",
    type: "sent",
    name: "Jane Smith",
    amount: "500.00",
    currency: "XAF",
    date: "Yesterday, 3:45 PM",
    status: "completed",
  },
  {
    id: "3",
    type: "topup",
    name: "NkwaPay",
    amount: "1,000.00",
    currency: "XAF",
    date: "May 7, 2025",
    status: "completed",
  },
  {
    id: "4",
    type: "sent",
    name: "Michael Johnson",
    amount: "300.00",
    currency: "XAF",
    date: "May 5, 2025",
    status: "pending",
  },
  // Add more transactions...
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.includes(searchQuery) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || transaction.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  All your financial activities in one place
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:flex md:gap-2">
                <Tabs value={selectedType} onValueChange={setSelectedType}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                    <TabsTrigger value="received">Received</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Status</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <motion.div layout className="space-y-2">
                {filteredTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="bg-muted rounded-full p-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      No transactions found
                    </p>
                  </div>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                    >
                      <TransactionItem
                        type={transaction.type}
                        name={transaction.name}
                        amount={transaction.amount}
                        currency={transaction.currency}
                        date={transaction.date}
                        status={transaction.status}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transaction Details Sidebar (could be implemented later) */}
      {/* Pagination (could be implemented later) */}
    </div>
  );
}
