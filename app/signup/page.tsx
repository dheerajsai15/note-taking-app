"use client"

import Link from "next/link";
import { signUpAction } from "./actions";
import { useActionState } from "react";

export default function SignupPage() {
  const initialState = { error: null }
  const [ state, formAction, isPending ] = useActionState(signUpAction, initialState);

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_30%),linear-gradient(180deg,_#000000_0%,_#0a0a0a_100%)]" />
      <div className="absolute top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

      <section
        className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
        style={{ animation: "cardIn 650ms cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-orange-200/80">
            Sign up
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create account
          </h1>
        </div>

        <form className="space-y-5" action={formAction}>
          <div className="relative">
            <input
              className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-6 pb-2.5 text-base text-white outline-none transition-all duration-300 ease-out placeholder:text-transparent focus:-translate-y-0.5 focus:scale-[1.01] focus:border-orange-400 focus:bg-white/8 focus:ring-4 focus:ring-orange-500/15"
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email"
            />
            <label
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/55 transition-all duration-200 ease-out peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-orange-300"
              htmlFor="signup-email"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-6 pb-2.5 text-base text-white outline-none transition-all duration-300 ease-out placeholder:text-transparent focus:-translate-y-0.5 focus:scale-[1.01] focus:border-orange-400 focus:bg-white/8 focus:ring-4 focus:ring-orange-500/15"
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Password"
            />
            <label
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/55 transition-all duration-200 ease-out peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-orange-300"
              htmlFor="signup-password"
            >
              Password
            </label>
          </div>

          <div className="relative">
            <input
              className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-6 pb-2.5 text-base text-white outline-none transition-all duration-300 ease-out placeholder:text-transparent focus:-translate-y-0.5 focus:scale-[1.01] focus:border-orange-400 focus:bg-white/8 focus:ring-4 focus:ring-orange-500/15"
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm password"
            />
            <label
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/55 transition-all duration-200 ease-out peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-orange-300"
              htmlFor="signup-confirm-password"
            >
              Confirm password
            </label>
          </div>

          {state.error && (
            <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl cursor-pointer bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 px-4 py-3.5 text-base font-semibold text-black shadow-lg shadow-orange-500/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-orange-400/30 focus:outline-none focus:ring-4 focus:ring-orange-300/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-orange-300 transition-colors hover:text-orange-200"
          >
            Log in
          </Link>
        </p>
      </section>

      <style>{`
        .peer:not(:placeholder-shown) + label {
          top: 0.75rem;
          transform: translateY(0);
          font-size: 0.75rem;
          color: rgb(253 186 116 / 0.95);
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
