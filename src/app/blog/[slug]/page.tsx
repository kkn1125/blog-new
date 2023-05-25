"use client";

export const dynamic = "error";

import { BASEPATH } from "@/util/global";
import { Box, Container, Stack } from "@mui/material";
import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  children: string;
  className: string;
}

const components = {
  code: ({ children, className }: CodeBlockProps) => {
    const language = className.replace(/language-/, "");

    return (
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={tomorrowNight}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

export default function Page(props: any) {
  const [data, setData] = useState<any>(null);
  const { params } = props;

  useEffect(() => {
    (async () => {
      const { source } = (await getData(params.slug)) as any;
      setData(source);
    })();
  }, []);

  return (
    <Box sx={{}}>
      {data && (
        <>
          <div>{data?.frontmatter?.title || ""}</div>
          <MDXRemote {...data} components={components as MDXComponents} />
        </>
      )}
    </Box>
  );
}

async function getData(slug: string) {
  const res = await fetch(`http://${BASEPATH}:3000/api/slug/${slug}`, {
    cache: "force-cache",
  });
  const posts = await res.json();
  console.log("posts", posts);
  console.log("posts", posts.content);
  const mdxSource =
    (await serialize(posts.content || "", {
      // parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV !== "production",
      },
    })) || {};

  mdxSource.frontmatter = posts.frontmatter;

  return {
    source: mdxSource,
  };
}
