"use client";

import config from "@/app/config";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, KeyRound, Mail, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hostname === config.demoDomain) {
      setIsDemo(true);
      setEmail(config.exampleEmail);
      setPassword(config.examplePassword);
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Email hoặc mật khẩu không đúng.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-neutral selection:bg-amber-200 selection:text-amber-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-amber-50 to-transparent" />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-3xl border border-white/80 bg-white/80 p-8 shadow-soft backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm ring-1 ring-stone-100 transition-all hover:scale-105 hover:shadow-md"
              aria-label="Về trang công khai"
            >
              <Shield className="size-8" />
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Quản trị
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
              Đăng nhập quản trị
            </h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Quản lý phả hệ, phả ký, phả đồ và cấu hình nội dung công khai.
            </p>
            {isDemo && (
              <div className="mt-4 rounded-xl border border-amber-200/70 bg-amber-50 p-3 text-[13px] font-semibold text-amber-800">
                Website demo. Tài khoản mẫu đã được điền sẵn.
              </div>
            )}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email-address"
                className="ml-1 block text-[13px] font-semibold text-stone-600"
              >
                Email
              </label>
              <div className="group relative mt-1.5 flex items-center">
                <Mail className="absolute left-3.5 size-5 text-stone-400 transition-colors group-focus-within:text-amber-500" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border border-stone-200/80 bg-white/70 py-3.5 pr-4 pl-11 text-stone-900 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="ml-1 block text-[13px] font-semibold text-stone-600"
              >
                Mật khẩu
              </label>
              <div className="group relative mt-1.5 flex items-center">
                <KeyRound className="absolute left-3.5 size-5 text-stone-400 transition-colors group-focus-within:text-amber-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-stone-200/80 bg-white/70 py-3.5 pr-4 pl-11 text-stone-900 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-center text-[13px] font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-[15px] font-bold disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/setup" className="btn w-full py-3 text-sm">
              <Settings className="size-4" />
              Cấu hình
            </Link>
            <Link href="/" className="btn w-full py-3 text-sm">
              Trang công khai
            </Link>
          </div>
        </section>
      </main>

      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-stone-500 shadow-sm transition-all hover:border-stone-300 hover:text-stone-900 hover:shadow-md"
      >
        <ArrowLeft className="size-4" />
        Trang công khai
      </Link>

      <Footer className="relative z-10 mt-auto border-none bg-transparent" />
    </div>
  );
}
