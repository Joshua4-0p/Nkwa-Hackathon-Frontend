// app/dashboard/profile/page.tsx

"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart, PieChart } from "@mui/x-charts";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Briefcase,
  Wallet,
  Activity,
  ArrowUp,
} from "lucide-react";

export default function ProfilePage() {
  const profileData = {
    name: "Arrey Mbong",
    role: "Frontend Developer",
    email: "arrey.mbong@example.com",
    phone: "+237 800 000 000",
    location: "Douala, Cameroon",
    website: "www.arreymbong.dev",
    social: "@arrey-mbong",
    kycStatus: "verified",
    idNumber: "CM085632145789",
  };

  const financialData = {
    monthlyEarnings: 12000,
    transactions: 45,
    moneySent: 7500,
    moneyReceived: 18500,
    topUps: 3,
  };

  const earningsData = [
    { month: "Jan", earnings: 8000 },
    { month: "Feb", earnings: 12000 },
    { month: "Mar", earnings: 9000 },
    { month: "Apr", earnings: 15000 },
  ];

  const earningsDistribution = [
    { name: "E-commerce", value: 12000, color: "#3b82f6" },
    { name: "Consulting", value: 6500, color: "#10b981" },
    { name: "Mobile Apps", value: 8500, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>
              Your personal and financial insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-muted-foreground">{profileData.role}</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        {profileData.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">
                        {profileData.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">
                        {profileData.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">KYC Status</p>
                      <Badge variant="outline" className="text-success">
                        {profileData.kycStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Analytics */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="h-full">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-6 w-6 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Monthly Earnings
                            </p>
                            <p className="text-2xl font-bold">
                              XAF{" "}
                              {financialData.monthlyEarnings.toLocaleString()}
                            </p>
                            <div className="flex items-center text-success text-sm">
                              <ArrowUp className="h-4 w-4" />
                              +12% from last month
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="h-full">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                          <Activity className="h-6 w-6 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Transactions
                            </p>
                            <p className="text-2xl font-bold">
                              {financialData.transactions}
                            </p>
                            <div className="text-sm text-muted-foreground">
                              {financialData.moneySent.toLocaleString()} sent
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Charts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>
                      Monthly performance analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      series={[{ data: earningsData.map((d) => d.earnings) }]}
                      height={300}
                      xAxis={[
                        {
                          data: earningsData.map((d) => d.month),
                          scaleType: "band",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Distribution</CardTitle>
                    <CardDescription>Revenue sources breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      series={[{ data: earningsDistribution }]}
                      width={400}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
