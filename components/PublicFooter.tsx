import Link from "next/link";
import { contactInfo, siteContent } from "@/data/publicContent";

export default function PublicFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl font-bold text-stone-900">
            {siteContent.name}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
            {siteContent.description}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm font-bold text-stone-900">
            {contactInfo.templeName}
          </p>
          <p className="mt-2 text-sm text-stone-600">{contactInfo.address}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link href="/lien-he" className="btn py-2 text-sm">
              Liên hệ
            </Link>
            {/*
              Login is temporarily disabled while the public genealogy preview is published.
              <Link href="/login" className="btn-primary py-2 text-sm">
                Thành viên đăng nhập
              </Link>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
}
