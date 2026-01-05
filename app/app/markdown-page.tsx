import Link from "next/link";

type MarkdownPageLayoutProps = {
  title: string;
  html: string;
  backHref?: string;
  backLabel?: string;
};

export default function MarkdownPageLayout({
  title,
  html,
  backHref = "/",
  backLabel = "Back to home",
}: MarkdownPageLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fefcf7_0%,#f3efe6_40%,#e4efe7_100%)] text-foreground">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
      <main className="relative mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-4">
          <Link
            href={backHref}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-800"
          >
            {backLabel}
          </Link>
          <h1 className="font-[var(--font-heading)] text-4xl text-emerald-950 sm:text-5xl">
            {title}
          </h1>
        </header>
        <div
          className="space-y-6 text-base leading-7 text-emerald-900/80 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-700/40 [&_blockquote]:bg-white/60 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:text-emerald-950 [&_code]:rounded [&_code]:bg-emerald-900/10 [&_code]:px-2 [&_code]:py-1 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-emerald-950 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-emerald-950 [&_li]:ml-6 [&_li]:list-disc [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:text-base [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-emerald-950 [&_pre]:p-6 [&_pre]:text-sm [&_pre]:text-emerald-50 [&_strong]:text-emerald-950"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}
