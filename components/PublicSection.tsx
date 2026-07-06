import { ReactNode } from "react";

interface PublicSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export default function PublicSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: PublicSectionProps) {
  return (
    <section className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mb-8 max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
