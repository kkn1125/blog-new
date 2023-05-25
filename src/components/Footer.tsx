import { BRAND_NAME } from "@/util/global";
import { Box, Stack } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Stack
      direction='row'
      gap={3}
      justifyContent='center'
      sx={{
        p: 3,
        color: "#ffffff",
        backgroundColor: "#000000a6",
        fontWeight: 100,
      }}>
      <Box>
        Copyright 2021. <strong>{BRAND_NAME.toUpperCase()}</strong> All rights
        reserved.
      </Box>
    </Stack>
  );
}

export default Footer;
