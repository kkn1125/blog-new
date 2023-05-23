import PostLayout from "@/app/components/PostLayout";
import { getArticleFromSlug } from "@/app/lib/service";
import { BRAND_NAME } from "@/util/global";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: BRAND_NAME.toUpperCase(),
};

export default function Layout({ children }: { children: React.ReactElement }) {
  return <PostLayout>{children}</PostLayout>;
}
