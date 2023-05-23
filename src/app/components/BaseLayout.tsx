"use client";

import { Stack, Box } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";

const sidebarSize = {
  min: 250,
  max: 350,
};

function BaseLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) {
  return (
    <Stack
      direction='row'
      sx={{
        width: "100%",
      }}>
      <Box
        sx={{
          position: "relative",
          minWidth: sidebarSize.min,
          maxWidth: sidebarSize.max,
        }}>
        <SideBar />
      </Box>
      <Stack
        sx={{
          width: "100%",
        }}>
        {children}
      </Stack>
    </Stack>
  );
}

export default BaseLayout;
