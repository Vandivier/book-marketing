import Link from "next/link";
import WaitlistForm from "./waitlist-form";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fefcf7_0%,#f3efe6_40%,#e4efe7_100%)] text-foreground">
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-16">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                The Evergreen Series
              </p>
              <p className="text-sm text-emerald-900/70">
                Book release waitlist
              </p>
            </div>
          </div>
          {/* <nav className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800">
            <Link href="/about" className="transition hover:text-emerald-950">
              About
            </Link>
            <Link href="/updates" className="transition hover:text-emerald-950">
              Updates
            </Link>
          </nav> */}
        </header>

        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-800">
              Epic dark fantasy, romance, and Exploration of AI as Magic
            </p>

            <WaitlistForm />

            <h1 className="max-w-2xl font-(--font-heading) text-4xl leading-tight tracking-tight text-emerald-950 sm:text-5xl">
              Trust is a Dangerous Spell
            </h1>

            <p className="max-w-xl text-base leading-7 text-emerald-900/80 sm:text-lg">
              Navigating the dark world of life after assault, Val takes steps
              to protect herself. Safety is just the start. She wants revenge.
              James just wants to rescue his friend, but dark magic has a way of
              ruining friendships. Join the waitlist to be first in line for
              cover reveals, preorder news, and exclusive launch stories.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-900/10 bg-white/70 p-8 shadow-[0_20px_60px_-45px_rgba(16,52,42,0.6)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-800">
              BETA READING HORIZON
            </p>
            <h2 className="mt-3 font-(--font-heading) text-3xl text-emerald-950">
              Summer 2026
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-900/75">
              Be the first to get a sneak peek at the book and provide feedback.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-emerald-900">
              <div className="rounded-2xl border border-emerald-900/10 bg-emerald-900/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                  Waitlist Perk
                </p>
                <p className="mt-2 font-semibold">
                  Illustrated Character Profiles + Map
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-900/10 bg-emerald-900/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                  Insider updates
                </p>
                <p className="mt-2 font-semibold">
                  Exlusive Behind-the-Scenes Content
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-900/10 bg-emerald-900/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                  Waitlist Perk
                </p>
                <p className="mt-2 font-semibold">
                  Early Access to Selected Sections
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "A Magical World",
              text: "Evergreen is an AI MMO, where people and machines cast the same spells.",
            },
            {
              title: "Trading Souls",
              text: "Safety is a hard thing to find while truly dangerous people still live.",
            },
            {
              title: "Mind Bending",
              text: "In the age of information overload, reality and our perception of it blur.",
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
            <h2 className="mt-4 font-(--font-heading) text-3xl text-emerald-950">
              The Evergreen Series
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-900/75">
              Evergreen is a vast. People, magic, and technology are
              complicated. Expect more than a single book. Join the waitlist to
              stay up to date!
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-emerald-900/10 bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
                Book I: Image of the Beast
              </p>
              <p className="mt-2 text-sm text-emerald-900/70">
                Tentative title. Follow the waitlist updates!
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
