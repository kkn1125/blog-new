import fs from "fs";
import { globSync, sync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

const basePath = "src/database";

export const serializeMdx = (source: string) => {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: "mdx",
    },
  });
};

const articlesPath = path.join(process.cwd(), basePath);

export async function getAllSlugNames() {
  const paths = globSync(`${articlesPath}/*.mdx`).map((path) =>
    path
      .split(/\\+|\/+/)
      .pop()
      ?.replace(/\.mdx/, "")
  );
  return paths;
}

export async function getSlugs() {
  const paths = sync(`${basePath}/*.mdx`);
  const pathList = paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split(/\/+|\\+/);
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
  return pathList;
}

export async function getArticleFromSlug(slug: string) {
  console.log("!!!!!!", slug);
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  // const source = execSync(`cat ${articleDir}`).toString('utf-8')

  const source = fs.readFileSync(articleDir) as unknown as string;
  const { content, data } = matter(source);
  return {
    content,
    frontmatter: {
      slug: slug || "",
      excerpt: data.excerpt || "",
      title: data.title || "",
      publishedAt: data.date || new Date().toLocaleString("ko"),
      readingTime: readingTime(source).text,
      ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v || ""])),
    },
  };
}

export async function getAllBlogs() {
  const blogs = await getSlugs();
  return blogs.map(async (slug) => {
    return await getArticleFromSlug(slug);
  });
}

export async function getAllArticles() {
  const articles = fs.readdirSync(articlesPath);

  return articles.reduce((allArticles: any, articleSlug) => {
    // get parsed data from mdx files in the "articles" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), basePath, articleSlug),
      "utf-8"
    );
    const { data } = matter(source);

    if (articleSlug.match(/\.mdx/)) {
      return [
        {
          ...data,
          slug: articleSlug.replace(".mdx", ""),
          readingTime: readingTime(source).text,
        },
        ...allArticles,
      ];
    } else {
      return allArticles;
    }
  }, []);
}
