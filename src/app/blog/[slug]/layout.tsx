import PostLayout from "@/components/PostLayout";
import { getArticleFromSlug } from "@/lib/service";
import { BRAND_DESC, BRAND_NAME } from "@/util/global";
import { Metadata } from "next";
import React from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  return <PostLayout>{children}</PostLayout>;
}

export async function generateStaticParams() {
  const slugs = await fetch(`http://localhost:3000/api/blog/`, {
    cache: "force-cache",
  });
  const posts = await slugs.json();

  return posts.map((post: any) => ({
    slug: post.slug.replace(/\/+/, "").trim(),
  }));
}

// or Dynamic metadata
export async function generateMetadata({ params }: any) {
  const slug = await getArticleFromSlug(params.slug);
  // console.log(slug.frontmatter);
  if (slug) {
    return {
      title: `${BRAND_NAME.toUpperCase()} :: ${slug.frontmatter.title}`,
      description: slug.content
        .slice(0, 100)
        .replace(/[\`\']+/, "")
        .replace(/</g, "")
        .replace(/>/g, ""),
    };
  } else {
    return {
      title: `${BRAND_NAME.toUpperCase()}`,
      description: BRAND_DESC,
    };
  }
}
