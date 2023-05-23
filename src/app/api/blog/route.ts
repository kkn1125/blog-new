import {
  getAllArticles,
  getAllBlogs,
  getArticleFromSlug,
} from "@/app/lib/service";
import { NextResponse } from "next/server";

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
  const post = await getAllArticles();
  return NextResponse.json(post);
}
