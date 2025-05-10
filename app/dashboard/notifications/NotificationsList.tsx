"use client";
import { useSearchParams } from "next/navigation";

export default function NotificationsList() {
  const params = useSearchParams();
  const filter = params.get("filter") || "all";
  // ...fetch or filter notifications based on `filter`...
  return <div>{/* render notifications */}</div>;
}
