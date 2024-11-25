'use client'

export * from "@mui/material";
import { createTheme } from "@mui/material"

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
});

export default darkTheme;