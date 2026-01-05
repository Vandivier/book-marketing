import { notFound } from "next/navigation";

import { getMarkdownBySlug } from "@/lib/markdown";
import MarkdownPageLayout from "@/app/markdown-page";

export async function generateMetadata() {
  const page = getMarkdownBySlug(["about"]);
  if (!page) {
    return {};
  }

  return {
    title: page.meta.title,
  };
}

export default function AboutPage() {
  const page = getMarkdownBySlug(["about"]);
  if (!page) {
    notFound();
  }

  return <MarkdownPageLayout title={page.meta.title} html={page.html} />;
}
