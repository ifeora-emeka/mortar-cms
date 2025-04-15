export const theme = {
    fonts: {
        body: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", Arial, sans-serif",
        heading: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", Arial, sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
    },
    colors: {
        primary: "#FBCE57",
        "primary-foreground": "#2B180A",
        secondary: "#ec4899",
        "secondary-foreground": "#ffffff",
        success: "#02C99C",
        "success-foreground": "#ffffff",
        warning: "#f59e0b",
        "warning-foreground": "#ffffff",
        info: "#3b82f6",
        "info-foreground": "#ffffff",
        error: "#ef4444",
        "error-foreground": "#ffffff",
        
        background: "#1C1C1C",
        foreground: "#FBFBFB",
        muted: "#353542",
        "muted-foreground": "#8D939A",
        accent: "#292929",
        "accent-foreground": "#FBFBFB",
        border: "#2C2C2C",
        input: "#1e293b",
        ring: "#FBCE57",
        card: "#1C1C1C",
        "card-foreground": "#FBFBFB",

        
    },
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
    },
    borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        pill: "999px",
    },
    breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
    },
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
    },
    shadows: {
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)",
    },
}

export type Theme = typeof theme
