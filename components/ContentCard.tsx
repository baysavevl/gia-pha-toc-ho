import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ContentCardProps {
  href: string;
  title: string;
  summary: string;
  image?: string;
  badge?: string;
  meta?: string;
}

export default function ContentCard({
  href,
  title,
  summary,
  image,
  badge,
  meta,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-soft-hover"
    >
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {badge && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200/70">
              {badge}
            </span>
          )}
          {meta && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500">
              <CalendarDays className="size-3.5" />
              {meta}
            </span>
          )}
        </div>
        <h2 className="font-serif text-xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-amber-800">
          {title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">
          {summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-stone-700 group-hover:text-amber-700">
          Xem chi tiết
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
