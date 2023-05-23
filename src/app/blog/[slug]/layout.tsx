import PostLayout from "@/app/components/PostLayout";
import { getArticleFromSlug } from "@/app/lib/service";
import { Metadata } from "next";
import React from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  return <PostLayout>{children}</PostLayout>;
}

// or Dynamic metadata
export async function generateMetadata({ params }: any) {
  const slug = await getArticleFromSlug(params.slug);
  console.log(slug.frontmatter);
  return {
    title: `DEVKIMSON :: ${slug.frontmatter.title}`,
    description: slug.content.slice(0, 100),
  };
}
