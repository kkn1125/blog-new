import { getAllArticles, getArticleFromSlug } from "@/lib/service";
import { NextResponse } from "next/server";

export const dynamic = "auto";
export const dynamicParams = true;

export async function GET(request: Request, { params }: any) {
  // const articlesPath = path.join(process.cwd(), basePath, `${params.slug}`);
  // const paths = sync(`${articlesPath}.mdx`);
  // const pathList = paths.map((path) => {
  //   // holds the paths to the directory of the article
  //   const pathContent = path.split(/\/+|\\+/);
  //   const fileName = pathContent[pathContent.length - 1];
  //   const [slug, _extension] = fileName.split(".");

  //   return slug;
  // });
  try {
    const post = await getArticleFromSlug(params.slug);
    return NextResponse.json({ ...post });
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllArticles();

  return posts.map((post: any) => ({
    slug: post.slug.replace(/\/+/, "").trim(),
  }));
}
