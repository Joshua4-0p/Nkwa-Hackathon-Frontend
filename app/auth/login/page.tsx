"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHeader } from "@/components/auth-header";
import { ArrowRight, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const inputVariants = {
  focused: { scale: 1.02, borderColor: "#3b82f6" },
  error: { borderColor: "#ef4444" },
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return emailRegex.test(email) || phoneRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      validateField(field, value);
    }
  };

  // Handle blur events
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  // Field validation
  const validateField = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "email":
        error = validateEmail(value)
          ? ""
          : "Please enter a valid email or phone number";
        break;
      case "password":
        error = validatePassword(value)
          ? ""
          : "Password must be at least 8 characters";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  // Check form validity
  const isFormValid = () => {
    return validateEmail(formData.email) && validatePassword(formData.password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <AuthHeader />

      <motion.main
        initial="hidden"
        animate="visible"
        className="flex-1 flex items-center justify-center p-4 md:p-8"
      >
        <motion.div
          variants={cardVariants}
          className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="p-2 bg-blue-50/50 border-b">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure SSL Encrypted Connection</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Securely access your AfriPay account
              </p>
            </div>

            <div className="space-y-6">
              {/* Email/Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone Number</Label>
                <motion.div
                  variants={inputVariants}
                  animate={errors.email ? "error" : "visible"}
                >
                  <Input
                    id="email"
                    type="text"
                    placeholder="john.doe@example.com or +234..."
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className="transition-colors duration-200"
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-600"
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <motion.div
                  variants={inputVariants}
                  animate={errors.password ? "error" : "visible"}
                  className="relative"
                >
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => handleBlur("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </motion.div>
                <AnimatePresence>
                  {errors.password && touched.password && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-600"
                    >
                      {errors.password}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Keep me logged in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!isFormValid() || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Continue to Account
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.button>
            </div>
          </form>

          <div className="px-8 pb-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Create free account
            </Link>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
// Note: The above code uses Framer Motion for animations and assumes you have a custom theme with Tailwind CSS.