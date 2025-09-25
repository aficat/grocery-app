import React from "react";

export default function MobileShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="relative mx-auto max-w-[420px] min-h-screen bg-background">
        {children}
      </div>
    </div>
  );
}
