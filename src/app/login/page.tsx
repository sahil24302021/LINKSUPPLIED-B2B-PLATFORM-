"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-sm mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
            Log in
          </h1>
          <p className="mt-3 text-sm text-slate">
            Access your LINKSUPPLIED business account.
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-silver/15 p-6 md:p-8">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Business email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Your password"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-copper hover:bg-copper-muted text-surface text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-copper hover:text-copper-muted font-medium"
            >
              Register your business
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
