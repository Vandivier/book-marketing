import Link from "next/link";

import { getMarkdownEntriesInDir } from "@/lib/markdown";

export const metadata = {
  title: "Updates",
};

export default function UpdatesPage() {
  const entries = getMarkdownEntriesInDir(["updates"]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fefcf7_0%,#f3efe6_40%,#e4efe7_100%)] text-foreground">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
      <main className="relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-800"
          >
            Back to home
          </Link>
          <h1 className="font-[var(--font-heading)] text-4xl text-emerald-950 sm:text-5xl">
            Updates
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-emerald-900/75">
            News, behind-the-scenes notes, and launch-day details from the
            Evergreen Series.
          </p>
        </header>

        {entries.length === 0 ? (
          <div className="rounded-3xl border border-emerald-900/10 bg-white/70 p-8 text-sm text-emerald-900/70 shadow-sm">
            No updates yet. Add markdown files under public-md/updates to
            publish the first post.
          </div>
        ) : (
          <ul className="grid gap-4">
            {entries.map((entry) => (
              <li key={entry.slug.join("/")}>
                <Link
                  href={`/${entry.slug.join("/")}`}
                  className="flex flex-col gap-2 rounded-3xl border border-emerald-900/10 bg-white/70 p-6 transition hover:border-emerald-900/30 hover:bg-white"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-700">
                    Order {entry.meta.orderId}
                  </span>
                  <span className="text-lg font-semibold text-emerald-950">
                    {entry.meta.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
