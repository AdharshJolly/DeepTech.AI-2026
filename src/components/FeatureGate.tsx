"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ComingSoon from "./ComingSoon";

interface FeatureGateProps {
  flagKey: string;
  title: string;
  message: string;
  children: React.ReactNode;
}

export default function FeatureGate({
  flagKey,
  title,
  message,
  children,
}: FeatureGateProps) {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFlag = async () => {
      try {
        const res = await fetch("/api/admin/feature-flags");
        if (res.ok) {
          const flags = await res.json();
          const flag = flags.find(
            (f: { key: string; enabled: boolean }) => f.key === flagKey
          );
          setEnabled(flag?.enabled ?? false);
        } else {
          setEnabled(false);
        }
      } catch {
        setEnabled(false);
      }
    };
    checkFlag();
  }, [flagKey]);

  if (enabled === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-ieee-blue animate-spin" />
      </div>
    );
  }

  if (!enabled) {
    return <ComingSoon title={title} message={message} />;
  }

  return <>{children}</>;
}
