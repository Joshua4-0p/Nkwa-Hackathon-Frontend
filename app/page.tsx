"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  Lock,
  RefreshCw,
  Shield,
  Smartphone,
  BadgeCheck,
  WalletCards,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

// Animation variants
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const columnVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};

const logoVariants = {
  hover: { rotate: [0, -15, 15, 0], transition: { duration: 0.8 } },
  tap: { scale: 0.95 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 }
  }
};

const iconVariants = {
  hover: { rotate: 15, scale: 1.1 },
  tap: { scale: 0.95 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const securityFeatures = [
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: "256-bit Encryption",
    description: "Bank-level security for all transactions",
  },
  {
    icon: <Lock className="h-12 w-12 text-primary" />,
    title: "2FA Protection",
    description: "Biometric & SMS verification for all transactions",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-12 text-primary"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
    title: "Blockchain Audit",
    description: "All transactions immutably recorded on blockchain",
  },
  {
    icon: <BadgeCheck className="h-12 w-12 text-primary" />,
    title: "Regulatory Compliance",
    description: "Fully licensed and regulated in all operating countries",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
            >
              <span className="text-primary-foreground font-bold">A</span>
            </motion.div>
            <motion.span
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="font-bold text-xl"
            >
              AfriPay
            </motion.span>
          </motion.div>

          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex gap-8"
          >
            {[
              { href: "#features", icon: WalletCards, text: "Features" },
              { href: "#how-it-works", icon: RefreshCw, text: "How It Works" },
              { href: "#security", icon: Shield, text: "Security" },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
          >
            <Link href="/auth/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Animated Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid gap-12 lg:grid-cols-2 items-center"
            >
              <motion.div
                variants={fadeInLeft}
                className="space-y-6 max-w-[600px]"
              >
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full text-sm"
                >
                  <BadgeCheck className="h-4 w-4" />
                  <span>Trusted by 50,000+ Africans</span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl/none bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                >
                  Borderless Payments,
                  <br /> African Roots
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-muted-foreground"
                >
                  Send money across 15+ African countries instantly with fees
                  80% lower than traditional services.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg gap-2"
                    >
                      Start Sending Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span className="text-sm">PCI DSS Certified</span>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">15+ Countries</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInRight}
                className="relative aspect-video bg-gradient-to-tr from-primary/10 to-background rounded-2xl p-8 shadow-xl"
              >
                <Image
                  src="/U_ZBS3gVVgh9hlDGefEpD.svg"
                  alt="Africa Map with Transaction Flow"
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full object-contain"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-6 left-6 bg-background p-4 rounded-xl shadow-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-success/10 p-2 rounded-full">
                      <RefreshCw className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">1.2M+ Transactions</p>
                      <p className="text-sm text-muted-foreground">
                        Processed Securely
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Animated Value Proposition Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Lock,
                  title: "Bank-Grade Security",
                  text: "Military-grade encryption and biometric authentication protect every transaction",
                },
                {
                  icon: Globe,
                  title: "15+ Countries",
                  text: "Send to Nigeria, Ghana, Kenya, South Africa and more",
                },
                {
                  icon: WalletCards,
                  title: "Local Payments",
                  text: "Top up via NkwaPay, MTN Mobile Money, Airtel, and 10+ others",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="space-y-4 hover:shadow-lg p-10 rounded-lg"
                >
                  <div className="bg-primary/10 w-fit p-3 rounded-xl">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        {/* Enhanced Features Section */}
        <section id="features" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-center space-y-4 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground"
              >
                Features
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Built for Africa's Digital Future
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience financial services designed for Africa's unique needs
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Low-Cost Transfers Card */}
              <motion.div variants={cardVariants}>
                <Card
                  className="hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-primary/10 w-fit p-3 rounded-xl"
                    >
                      <RefreshCw className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Low-Cost Transfers</h3>
                    <p className="text-muted-foreground">
                      Save up to 80% on fees compared to traditional money
                      transfer services
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 bg-muted/50 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Example:</span>
                        <code className="text-sm font-mono">
                          XAF 10,000 fee = XAF 200
                        </code>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cross-Border Reach Card */}
              <motion.div variants={cardVariants}>
                <Card
                  className="hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-primary/10 w-fit p-3 rounded-xl"
                    >
                      <Globe className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Cross-Border Reach</h3>
                    <p className="text-muted-foreground">
                      Send to 15+ African countries including Nigeria, Ghana,
                      Kenya
                    </p>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="mt-4 bg-muted/50 p-4 rounded-lg"
                    >
                      <div className="flex flex-wrap gap-2">
                        {["NGN", "GHS", "KES"].map((currency, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 py-1 bg-primary/10 text-xs rounded-full"
                          >
                            {currency}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* USSD Access Card */}
              <motion.div variants={cardVariants}>
                <Card
                  className="hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-primary/10 w-fit p-3 rounded-xl"
                    >
                      <Smartphone className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">USSD Access</h3>
                    <p className="text-muted-foreground">
                      Full wallet access via *123# - no smartphone required
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mt-4 bg-muted/50 p-4 rounded-lg"
                    >
                      <code className="text-sm font-mono">
                        *123*Amount*Recipient#
                      </code>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Repeat similar motion.div structure for remaining cards */}
              {/* Local Integration Card */}
              <motion.div variants={cardVariants}>
                <Card
                  className="hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-primary/10 w-fit p-3 rounded-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-primary"
                      >
                        <path d="M12 22v-5" />
                        <path d="M9 8V2" />
                        <path d="M15 8V2" />
                        <path d="M18 8v4" />
                        <path d="M6 8v4" />
                        <path d="M12 12v5" />
                        <path d="M19 16l-7 6-7-6" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-bold">Local Integration</h3>
                    <p className="text-muted-foreground">
                      Connect with NkwaPay, MTN Mobile Money, Airtel, and 10+
                      others
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 space-y-2"
                    >
                      <div className="flex flex-wrap gap-2">
                        {["NkwaPay", "MTN", "Airtel"].map((provider, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-muted/50 text-sm rounded-full"
                          >
                            {provider}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Multi-Currency Wallet Card */}
              <motion.div variants={cardVariants}>
                <Card
                  className="hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-primary/10 w-fit p-3 rounded-xl"
                    >
                      <WalletCards className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Multi-Currency Wallet</h3>
                    <p className="text-muted-foreground">
                      Hold XAF, USD, EUR, and 5+ currencies in one secure wallet
                    </p>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="mt-4 bg-muted/50 p-4 rounded-lg"
                    >
                      <div className="flex flex-wrap gap-2">
                        {["XAF", "USD", "EUR"].map((currency, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 py-1 bg-primary/10 text-xs rounded-full"
                          >
                            {currency}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Instant KYC Card */}
              <motion.div variants={cardVariants}>
                <Card
                  className="hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-primary/10 w-fit p-3 rounded-xl"
                    >
                      <Lock className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Instant KYC</h3>
                    <p className="text-muted-foreground">
                      AI-powered verification completes in under 2 minutes
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 bg-muted/50 p-4 rounded-lg flex items-center gap-2"
                    >
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="h-full bg-primary/50"
                        />
                      </div>
                      <span className="text-sm">Verification Progress</span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <motion.section
          id="how-it-works"
          className="py-12 md:py-24 bg-muted/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center space-y-4 mb-12"
              variants={itemVariants}
            >
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl"
                variants={fadeInLeft}
              >
                Simple Money Transfer in 3 Steps
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-xl mx-auto"
                variants={fadeInRight}
              >
                Send money to any African country as easily as sending a text
                message
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              variants={containerVariants}
            >
              {/* Step 1 */}
              <motion.div
                className="relative text-center p-8 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  1
                </motion.div>
                <h3 className="text-xl font-bold mt-6">Create Your Wallet</h3>
                <p className="text-muted-foreground mt-2">
                  Sign up, complete KYC verification, and create your secure
                  digital wallet
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="relative text-center p-8 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  2
                </motion.div>
                <h3 className="text-xl font-bold mt-6">Top Up Your Wallet</h3>
                <p className="text-muted-foreground mt-2">
                  Add funds using local payment methods like NkwaPay or bank
                  transfers
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="relative text-center p-8 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  3
                </motion.div>
                <h3 className="text-xl font-bold mt-6">Send Money</h3>
                <p className="text-muted-foreground mt-2">
                  Transfer funds to any supported country instantly with minimal
                  fees
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Trust Section */}
        {/* Enhanced Trust Section with Unique Animations */}
        <motion.section
          id="security"
          className="py-12 md:py-24 bg-primary/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center space-y-4 mb-12"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                },
              }}
            >
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 120, damping: 10 },
                  },
                }}
              >
                Your Security is Our Priority
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-2xl mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", delay: 0.2 },
                  },
                }}
              >
                Enterprise-grade protection for your financial transactions
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.4 },
                },
              }}
            >
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 150,
                        damping: 10,
                      },
                    },
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="mx-auto w-fit"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced CTA Section */}
        {/* Animated CTA Section */}
        <motion.section
          className="py-12 md:py-24 bg-gradient-to-b from-primary/10 to-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="bg-primary/5 rounded-3xl p-8 md:p-16 text-center space-y-8 border border-primary/10 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 10,
                    delay: 0.2,
                  },
                },
              }}
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: `radial-gradient(circle at ${
                    Math.random() * 100
                  }% ${
                    Math.random() * 100
                  }%, var(--primary) 0%, transparent 100%)`,
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }}
              />

              <motion.div
                className="space-y-8 relative"
                variants={containerVariants}
              >
                <motion.h2
                  className="text-3xl font-bold tracking-tighter md:text-4xl max-w-2xl mx-auto"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 150,
                        mass: 0.5,
                      },
                    },
                  }}
                >
                  Join Africa's Financial Revolution
                </motion.h2>

                <motion.p
                  className="text-muted-foreground max-w-xl mx-auto"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        delay: 0.3,
                        stiffness: 120,
                      },
                    },
                  }}
                >
                  Create your free account in 2 minutes and send your first
                  transfer today
                </motion.p>

                <motion.div
                  className="flex flex-col gap-4 sm:flex-row justify-center"
                  variants={{
                    hidden: { scale: 0.9 },
                    visible: {
                      scale: 1,
                      transition: {
                        type: "spring",
                        delay: 0.4,
                        stiffness: 200,
                      },
                    },
                  }}
                >
                  <Link href="/auth/register">
                    <motion.div
                      whileHover={{
                        y: -3,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full"
                    >
                      <Button
                        size="lg"
                        className="rounded-full px-8 py-6 text-lg gap-2 relative"
                      >
                        <motion.span
                          animate={{
                            x: [0, 5, 0],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                            },
                          }}
                        >
                          Start Free Now
                        </motion.span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="inline-block"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        className="border-t bg-gradient-to-b from-primary/5 to-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <div className="container py-16">
          <motion.div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <motion.div variants={columnVariants} className="space-y-6">
              <motion.div
                className="flex items-center gap-3"
                whileHover="hover"
                whileTap="tap"
                variants={logoVariants}
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">
                    A
                  </span>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  AfriPay
                </span>
              </motion.div>
              <motion.p
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Revolutionizing cross-border payments in Africa through
                blockchain technology
              </motion.p>
              <div className="flex gap-4">
                {[Globe, Mail].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="p-2 bg-background rounded-full shadow-sm border"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={columnVariants} className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-3">
                {["About Us", "Careers", "Blog", "FAQs"].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Link href={`/${link.toLowerCase()}`}>{link}</Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div variants={columnVariants} className="space-y-4">
              <h4 className="text-lg font-semibold">Legal</h4>
              <div className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Security",
                  "Compliance",
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Link href={`/${link.toLowerCase()}`}>{link}</Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={columnVariants} className="space-y-4">
              <h4 className="text-lg font-semibold">Stay Updated</h4>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="relative"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border bg-background pr-20"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute right-2 top-2"
                >
                  <Button className="rounded-full px-4">Subscribe</Button>
                </motion.div>
              </motion.div>
              <div className="flex gap-4 mt-4">
                {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5 }}
                    className="p-2 bg-background rounded-full shadow-sm border"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="pt-8 border-t text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            © {new Date().getFullYear()} AfriPay. Empowering Africa's digital
            economy.
            <br />
            <motion.span
              className="inline-block mt-2 text-xs opacity-75"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Proudly serving 15+ African nations
            </motion.span>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
