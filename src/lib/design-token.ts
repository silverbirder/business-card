// GitHub theme design tokens
export const GITHUB_COLORS = {
  // Background colors
  background: {
    primary: "#0d1117",
    secondary: "#21262d",
    tertiary: "#161b22",
  },

  // Text colors
  text: {
    primary: "#f0f6fc",
    secondary: "#e6edf3",
    muted: "#7d8590",
  },

  // Accent colors
  accent: {
    blue: "#58a6ff",
    red: "#f85149",
    green: "#56d364",
    purple: "#d2a8ff",
    orange: "#ffa657",
    yellow: "#f1c40f",
    lightBlue: "#3498db",
    darkPurple: "#9b59b6",
    darkOrange: "#e67e22",
    darkYellow: "#f39c12",
    darkRed: "#e74c3c",
    darkGreen: "#2ecc71",
  },

  // Language chart colors
  languageChart: ["#58a6ff", "#f85149", "#56d364", "#d2a8ff", "#ffa657"],

  // Activity chart colors
  activity: {
    none: "#161b22",
    low: "#0e4429",
    medium: "#006d32",
    high: "#26a641",
    highest: "#39d353",
  },
} as const;

// Spacing design tokens
export const SPACING = {
  // Base units
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "10px",
  "2xl": "12px",
  "3xl": "15px",
  "4xl": "20px",
} as const;

// Border radius design tokens
export const RADIUS = {
  // Base units
  xs: "3px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "999px",
} as const;

// Typography design tokens
export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontSize: "32px",
    fontWeight: "700",
  },
  h2: {
    fontSize: "24px",
    fontWeight: "600",
  },
  h3: {
    fontSize: "20px",
    fontWeight: "600",
  },
  h4: {
    fontSize: "16px",
    fontWeight: "600",
  },

  // Body text
  body: {
    fontSize: "14px",
    fontWeight: "400",
  },
  bodySmall: {
    fontSize: "12px",
    fontWeight: "400",
  },

  // Code
  code: {
    fontSize: "14px",
    fontWeight: "400",
  },
  codeSmall: {
    fontSize: "12px",
    fontWeight: "400",
  },

  // Labels and buttons
  label: {
    fontSize: "12px",
    fontWeight: "500",
  },
  button: {
    fontSize: "14px",
    fontWeight: "500",
  },

  // Caption
  caption: {
    fontSize: "11px",
    fontWeight: "400",
  },
} as const;
