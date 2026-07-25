'use client'

export * from "@mui/material";
import { createTheme } from "@mui/material"

const darkTheme = createTheme({
    palette: {
        // mode: "dark",
        mode: "light",
        background: {
            default: "#ffffff",
        },
    },
});

export default darkTheme;