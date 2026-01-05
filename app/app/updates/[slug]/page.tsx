import { notFound } from "next/navigation";

import { getMarkdownEntriesInDir, getMarkdownBySlug } from "@/lib/markdown";
import MarkdownPageLayout from "@/app/markdown-page";

type UpdatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getMarkdownEntriesInDir(["updates"]).map((entry) => ({
    slug: entry.slug.at(-1) ?? "",
  }));
}

export async function generateMetadata({ params }: UpdatePageProps) {
  const { slug } = await params;
  const page = getMarkdownBySlug(["updates", slug]);
  if (!page) {
    return {};
  }

  return {
    title: page.meta.title,
  };
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params;
  const page = getMarkdownBySlug(["updates", slug]);
  if (!page) {
    notFound();
  }

  return (
    <MarkdownPageLayout
      title={page.meta.title}
      html={page.html}
      backHref="/updates"
      backLabel="Back to updates"
    />
  );
}
