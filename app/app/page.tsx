import WaitlistForm from "./waitlist-form";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fefcf7_0%,#f3efe6_40%,#e4efe7_100%)] text-foreground">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 sm:px-10 lg:px-16">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-800/30 bg-emerald-900/10 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-900">
              ES
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                The Evergreen Series
              </p>
              <p className="text-sm text-emerald-900/70">
                Book release waitlist
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800">
            <a href="/about" className="transition hover:text-emerald-950">
              About
            </a>
            <a href="/updates" className="transition hover:text-emerald-950">
              Updates
            </a>
          </nav>
          <a
            href="#waitlist"
            className="rounded-full border border-emerald-800/40 bg-emerald-900/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-900 transition hover:bg-emerald-900/20"
          >
            Notify me
          </a>
        </header>

        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-800">
              Epic fantasy with a living forest at its heart
            </p>
            <h1 className="max-w-2xl font-[var(--font-heading)] text-4xl leading-tight tracking-tight text-emerald-950 sm:text-5xl">
              Enter a realm where every leaf remembers, and every oath has a
              cost.
            </h1>
            <p className="max-w-xl text-base leading-7 text-emerald-900/80 sm:text-lg">
              The Evergreen Series follows a wandering archivist and a hidden
              heir as they cross a sentient wilderness to restore a fractured
              kingdom. Join the waitlist to be first in line for cover reveals,
              preorder news, and exclusive launch stories.
            </p>

            <WaitlistForm />
          </div>

          <div className="rounded-3xl border border-emerald-900/10 bg-white/70 p-8 shadow-[0_20px_60px_-45px_rgba(16,52,42,0.6)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-800">
              Release horizon
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl text-emerald-950">
              Winter 2025
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-900/75">
              Be the first to know when preorders open and limited collector
              editions drop.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-emerald-900">
              <div className="rounded-2xl border border-emerald-900/10 bg-emerald-900/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                  Launch perks
                </p>
                <p className="mt-2 font-semibold">
                  Bonus map print + early chapters
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-900/10 bg-emerald-900/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                  Insider updates
                </p>
                <p className="mt-2 font-semibold">
                  Behind-the-scenes lore drops
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "A sentient forest",
              text: "The Evergreen listens, judges, and reshapes the paths of those who enter.",
            },
            {
              title: "Relics and rebels",
              text: "Forgotten artifacts awaken, binding unlikely allies to a dangerous oath.",
            },
            {
              title: "A kingdom in exile",
              text: "A lost heir returns with a map etched in living bark and a clock ticking down.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-emerald-900/10 bg-white/60 p-6 shadow-sm"
            >
              <h3 className="font-(--font-heading) text-2xl text-emerald-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-emerald-900/75">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-800">
              The series arc
            </p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl text-emerald-950">
              The Evergreen Series
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-900/75">
              Each book follows a different guide through the forest, revealing
              a hidden layer of its memory. Expect lyrical prose, high-stakes
              alliances, and a slow-burn mystery across the saga.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-emerald-900/10 bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                Book I (working title): Image of the Beast
              </p>
              <p className="mt-2 text-sm text-emerald-900/70">
                Tentative title. Follow the waitlist updates for future book
                names and release news.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-start gap-4 border-t border-emerald-900/10 pt-8 text-sm text-emerald-900/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            The Evergreen Series is an upcoming fantasy saga. Join the waitlist
            to stay close to the release.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
            Powered by{" "}
            <a
              href="https://ladderly.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ladderly.io
            </a>{" "}
            ❤️ 🔥 ☕
          </p>
        </footer>
      </main>
    </div>
  );
}
