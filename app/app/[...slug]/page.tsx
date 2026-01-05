import { notFound } from "next/navigation";

import { getAllMarkdownSlugs, getMarkdownBySlug } from "@/lib/markdown";
import MarkdownPageLayout from "@/app/markdown-page";

type MarkdownPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: MarkdownPageProps) {
  const { slug } = await params;
  const page = getMarkdownBySlug(slug);
  if (!page) {
    return {};
  }

  return {
    title: page.meta.title,
  };
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllMarkdownSlugs().map((slug) => ({ slug }));
}

export default async function MarkdownPage({ params }: MarkdownPageProps) {
  const { slug } = await params;
  const page = getMarkdownBySlug(slug);
  if (!page) {
    notFound();
  }

  return <MarkdownPageLayout title={page.meta.title} html={page.html} />;
}
