import { siteContent } from "@/data/publicContent";
import { BookOpen, Home, Mail, TreePine, Users } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/#pha-he-cong-khai", label: "Phả hệ", icon: Users },
  { href: "/#pha-do-cong-khai", label: "Phả đồ", icon: TreePine },
  { href: "/pha-ky", label: "Phả ký", icon: BookOpen },
  { href: "/lien-he", label: "Liên hệ", icon: Mail },
];

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <TreePine className="size-5" />
          </span>
          <span className="truncate font-serif text-xl font-bold text-stone-900">
            {siteContent.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-amber-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-stone-100 px-4 py-2 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-amber-50 hover:text-amber-700"
            >
              <Icon className="size-3.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
