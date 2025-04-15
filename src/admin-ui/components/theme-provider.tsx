'use client';

import type React from "react"
import { createContext, useContext } from "react"
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from "styled-components"
import { theme } from "../../styles/theme"

const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.background};
    color: ${theme.colors.foreground};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContext.Provider value={{}}>
            <StyledThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    )
}
