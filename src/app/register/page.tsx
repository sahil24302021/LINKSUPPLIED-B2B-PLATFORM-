"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
            Register your business
          </h1>
          <p className="mt-3 text-sm text-slate">
            Tell us about your business so we can start matching you with
            relevant companies.
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-silver/15 p-6 md:p-8">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="company-name"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Company name
              </label>
              <input
                id="company-name"
                type="text"
                placeholder="Your company name"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="business-type"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Business type
              </label>
              <select
                id="business-type"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your business type
                </option>
                <option value="manufacturer">Manufacturer</option>
                <option value="supplier">Supplier</option>
                <option value="distributor">Distributor</option>
                <option value="buyer">Buyer / Procurement</option>
                <option value="wholesaler">Wholesaler</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Primary industry
              </label>
              <input
                id="industry"
                type="text"
                placeholder="e.g. Cosmetics Packaging, Textiles, Industrial Components"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="City, Country"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Business email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 bg-paper border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-copper hover:bg-copper-muted text-surface text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-copper hover:text-copper-muted font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
