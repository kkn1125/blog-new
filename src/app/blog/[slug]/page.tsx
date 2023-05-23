"use client";

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
  console.log(props);

  // useEffect(() => {
  //   (async () => {
  //     const { source } = await getData(params.slug);
  //     setData(source);
  //   })();
  // }, []);

  return (
    <Box sx={{}}>
      <div>{(data as any)?.frontmatter?.title || ""}</div>
      <MDXRemote {...data} components={components as MDXComponents} />
    </Box>
  );
}

export const generateStaticParams = async (slug: string) => {
  const slugs = await fetch(`http://localhost:3000/api/blog/slug/${slug}`);
  const post = await slugs.json();
  const mdxSource = await serialize(post.content || "", {
    parseFrontmatter: true,
    mdxOptions: {
      development: true,
    },
  });

  mdxSource.frontmatter = post.frontmatter;
  return {
    post,
    source: mdxSource,
  };
};
