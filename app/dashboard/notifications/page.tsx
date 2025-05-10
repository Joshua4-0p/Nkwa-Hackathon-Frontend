// app/dashboard/notifications/page.tsx

"use client";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Wallet,
  Send,
  UserCheck,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { Suspense } from "react";

export const dynamic = "force-dynamic";

const notifications = [
  {
    type: "received",
    title: "Money Received",
    description: "You received XAF 150,000 from John Doe",
    date: "2 mins ago",
    read: false,
    icon: <ArrowDown className="h-5 w-5 text-success" />,
  },
  {
    type: "sent",
    title: "Transfer Successful",
    description: "Your transfer of XAF 50,000 to Jane Smith was completed",
    date: "1 hour ago",
    read: true,
    icon: <ArrowUp className="h-5 w-5 text-destructive" />,
  },
  {
    type: "kyc",
    title: "KYC Approved",
    description: "Your identity verification has been approved",
    date: "5 hours ago",
    read: false,
    icon: <UserCheck className="h-5 w-5 text-primary" />,
  },
  {
    type: "topup",
    title: "Wallet Top-Up",
    description: "Successfully added XAF 200,000 via Mobile Money",
    date: "1 day ago",
    read: true,
    icon: <Wallet className="h-5 w-5 text-success" />,
  },
  {
    type: "system",
    title: "Security Alert",
    description: "New device logged into your account",
    date: "2 days ago",
    read: false,
    icon: <AlertTriangle className="h-5 w-5 text-warning" />,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  // const searchParams = useSearchParams();
  // const amount = searchParams.get("amount") || "0.00";

  const notifications = [
    {
      type: "topup",
      title: "Top-Up Successful",
      description: `Your wallet has been credited with 1000XAF`,
      date: "Just now",
      read: false,
      icon: <Wallet className="h-5 w-5 text-success" />,
    },
  ];

  const filteredNotifications = notifications.filter((n) => {
    const matchesFilter = filter === "all" || n.type === filter;
    const matchesUnread = !unreadOnly || !n.read;
    return matchesFilter && matchesUnread;
  });

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "received":
        return "bg-success/10";
      case "sent":
        return "bg-destructive/10";
      case "kyc":
        return "bg-primary/10";
      case "system":
        return "bg-warning/10";
      default:
        return "bg-muted";
    }
  };

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
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Your recent account activities
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant={unreadOnly ? "default" : "outline"}
                  onClick={() => setUnreadOnly(!unreadOnly)}
                >
                  Show Unread Only
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div layout className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground"
                >
                  <Bell className="h-12 w-12" />
                  <p>No notifications found</p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-lg ${getNotificationColor(
                      notification.type
                    )} ${
                      !notification.read ? "border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{notification.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="h-5 px-1.5">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <time className="text-xs text-muted-foreground mt-1 block">
                          {notification.date}
                        </time>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
