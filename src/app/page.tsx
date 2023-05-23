"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home(props: any) {
  const [blogs, setBlogs] = useState([]);
  console.log(props);

  useEffect(() => {
    (async () => {
      const { posts } = await getData();
      setBlogs(posts);
    })();
  }, []);

  return (
    <Stack>
      <Typography component='h3' variant='h3'>
        Blogs
      </Typography>
      <Box>{blogs.length}</Box>
    </Stack>
  );
}

async function getData() {
  const slugs = await fetch(`http://localhost:3000/api/blog/`);
  const post = await slugs.json();
  return {
    posts: post,
  };
}
