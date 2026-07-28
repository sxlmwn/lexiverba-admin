import * as React from "react"
import { cn } from "../../utils/cn"

// Simplified DropdownMenu implementation since @radix-ui/react-dropdown-menu might require too much setup

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block text-left group">{children}</div>;
};

export const DropdownMenuTrigger = ({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) => {
  return <div className="cursor-pointer">{children}</div>;
};

export const DropdownMenuContent = ({ children, align = "end", className }: { children: React.ReactNode, align?: "end" | "start", className?: string }) => {
  return (
    <div className={cn(
      "absolute hidden group-hover:block z-50 mt-1 w-48 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 shadow-xl py-1 animate-in fade-in zoom-in-95",
      align === "end" ? "right-0" : "left-0",
      className
    )}>
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};

export const DropdownMenuLabel = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-4 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{children}</div>;
}

export const DropdownMenuSeparator = () => {
  return <div className="h-px my-1 bg-slate-100 dark:bg-zinc-800" />;
}
