import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@mui/material/styles"
import theme from "@/theme/theme"
import CssBaseLine from "@mui/material/CssBaseline"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
