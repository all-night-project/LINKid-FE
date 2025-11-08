export const theme = {
    colors: {
        primary: {
            200: "FDF9FA",
            400: "FAEFEF",
            500: "F4C2C2",
            600: "F87171",
        },

        secondary: {
            // green
            200: "F5F7F5",
            500: "C8E6C9",
            600: "28A745",
            // yellow
            800: "FFFCDE",
            900: "312E81",
        },

        gray: {
            200: "F6F6F6",
            300: "F1EDEC",
            500: "DADADA",
            600: "737373",
        },

        background: "FFF8F3",
        textPrimary: "5A4A42",
        textSecondary: "9C93BD",
        white: "FFFFFF",
    },

    typography: {
        fontFamily: `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Noto Sans KR', sans-serif`,
        weights: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
        },
        sizes: {
            xs: "12px",
            sm: "14px",
            base: "16px",
            md: "18px",
            lg: "20px",
            xl: "24px",
            "2xl": "28px",
        },
    },

    radius: {
        sm: "8px",
        md: "12px",
        lg: "15px",
        xl: "20px",
        round: "9999px",
    },
} as const;

export type ThemeType = typeof theme;