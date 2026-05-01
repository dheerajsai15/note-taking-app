import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      {/* ── Background glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-amber-500/6 blur-[140px]" />
        <div className="absolute left-1/3 top-1/4 h-40 w-40 rounded-full bg-orange-400/5 blur-[80px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-sm font-bold text-black">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight">Notes</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all duration-200 hover:shadow-orange-400/30 hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-24 text-center sm:px-10 lg:pt-20 lg:pb-32">
        <div
          className="hero-entrance inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-xs font-medium text-orange-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
          </span>
          Introducing Spaces
        </div>

        <h1
          className="hero-entrance mt-8 max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Your ideas,
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            beautifully organized.
          </span>
        </h1>

        <p
          className="hero-entrance mt-6 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl"
        >
          Create spaces for every project. Write, edit, and save notes in a
          distraction-free environment designed for focus.
        </p>

        <div
          className="hero-entrance mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-400/30"
          >
            Start Writing Free
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-orange-400/30 hover:bg-white/[0.07] hover:text-white"
          >
            Already have an account?
          </Link>
        </div>

        {/* ── Floating UI mockup ── */}
        <div
          className="hero-entrance mt-20 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 shadow-2xl shadow-black/50 backdrop-blur-xl">
            {/* mockup body — 3 panes like the real app */}
            <div className="flex h-72 sm:h-96">
              {/* ── Left: Spaces Sidebar ── */}
              <div className="hidden w-48 shrink-0 flex-col border-r border-white/[0.06] p-3 sm:flex">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-[10px] font-bold text-black">
                    D
                  </div>
                  <span className="text-[11px] font-semibold">Notes</span>
                </div>
                <div className="mb-2 px-1">
                  <div className="h-6 w-full rounded-lg border border-white/10 bg-white/5" />
                </div>
                <div className="mt-2 px-1 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/25">
                  Spaces
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2 py-1.5 ring-1 ring-white/[0.08]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-500/15 text-[10px] font-bold text-orange-300">P</div>
                    <div className="h-2 w-16 rounded bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold text-white/30">W</div>
                    <div className="h-2 w-14 rounded bg-white/10" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold text-white/30">J</div>
                    <div className="h-2 w-12 rounded bg-white/10" />
                  </div>
                </div>
              </div>

              {/* ── Middle: Notes Sidebar ── */}
              <div className="hidden w-52 shrink-0 flex-col border-r border-white/[0.06] p-3 sm:flex">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-[11px] font-semibold text-white/50">Personal</span>
                </div>
                <div className="space-y-1.5">
                  <div className="rounded-xl border border-orange-400/15 bg-orange-500/[0.06] p-2.5">
                    <div className="mb-1.5 h-2 w-3/4 rounded bg-white/20" />
                    <div className="h-1.5 w-full rounded bg-white/[0.06]" />
                    <div className="mt-1 h-1.5 w-5/6 rounded bg-white/[0.06]" />
                  </div>
                  <div className="rounded-xl p-2.5">
                    <div className="mb-1.5 h-2 w-20 rounded bg-white/10" />
                    <div className="h-1.5 w-full rounded bg-white/[0.04]" />
                  </div>
                  <div className="rounded-xl p-2.5">
                    <div className="mb-1.5 h-2 w-24 rounded bg-white/10" />
                    <div className="h-1.5 w-5/6 rounded bg-white/[0.04]" />
                  </div>
                </div>
              </div>

              {/* ── Right: Note Editor ── */}
              <div className="flex-1 flex-col overflow-hidden p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-2 w-24 rounded bg-white/10" />
                  <div className="h-6 w-20 rounded-lg bg-orange-500/20" />
                </div>
                <div className="mb-4 h-7 w-3/4 rounded bg-white/[0.12]" />
                <div className="mb-3 h-2 w-full rounded bg-white/[0.06]" />
                <div className="mb-3 h-2 w-5/6 rounded bg-white/[0.06]" />
                <div className="mb-3 h-2 w-4/5 rounded bg-white/[0.06]" />
                <div className="mb-3 h-2 w-full rounded bg-white/[0.06]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 border-t border-white/[0.06] bg-black px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to{" "}
              <span className="text-orange-400">stay organized</span>
            </h2>
            <p className="mt-4 text-white/40">
              Simple, powerful features designed for modern note-taking.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500/20">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 border-t border-white/[0.06] px-6 py-24 text-center sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to capture your{" "}
            <span className="bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
              best ideas?
            </span>
          </h2>
          <p className="mt-4 text-white/40">
            Join thousands of thinkers, writers, and creators who trust Notes to
            keep their ideas safe.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-400/30"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-orange-400/30 hover:bg-white/[0.07] hover:text-white"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-xs font-bold text-black">
              D
            </div>
            <span className="text-sm font-medium text-white/60">Notes</span>
          </div>
          <p className="text-xs text-white/30">
            Built for focus. Designed for you.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes heroFadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .hero-entrance {
          animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        .hero-entrance:nth-child(1) { animation-delay: 0.1s; }
        .hero-entrance:nth-child(2) { animation-delay: 0.25s; }
        .hero-entrance:nth-child(3) { animation-delay: 0.4s; }
        .hero-entrance:nth-child(4) { animation-delay: 0.55s; }
        .hero-entrance:nth-child(5) { animation-delay: 0.7s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .feature-card {
          opacity: 0;
          animation: heroFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
        />
      </svg>
    ),
    title: "Organized Spaces",
    desc: "Group your notes into dedicated spaces for work, personal projects, or any topic you can imagine.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
    title: "Distraction-Free Writing",
    desc: "A clean, minimal editor that puts your words first. No clutter, no noise — just you and your thoughts.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: "Secure by Default",
    desc: "Your notes are private and secure. Each space is tied to your account with safe authentication.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Timestamps & History",
    desc: "Automatically tracks when your notes were last updated, so you always know what's fresh.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
    ),
    title: "Fast & Responsive",
    desc: "Built on modern tech for instant load times. Works beautifully on desktop, tablet, and mobile.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    ),
    title: "Dark Mode First",
    desc: "A gorgeous dark interface designed to reduce eye strain and keep you focused day or night.",
  },
];
