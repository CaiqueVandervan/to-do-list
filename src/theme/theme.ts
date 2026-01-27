import { createTheme } from "@mui/material/styles"
import { Fredoka } from "next/font/google"

const fredoka = Fredoka({ subsets: ["latin"], display: "swap" })

const theme = createTheme({
    typography: {
        fontFamily: fredoka.style.fontFamily
    }
})

export default theme