import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-ins-sans)"],
    },
    extend: {
      backgroundImage: {
        radial: "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        active: "hsl(var(--active))",
        "active-link": "hsl(var(--active-link))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        platform: {
          github: "hsl(var(--github-color))",
          frontendmentor: "hsl(var(--frontendmentor-color))",
          twitter: "hsl(var(--twitter-color))",
          linkedin: "hsl(var(--linkedin-color))",
          youtube: "hsl(var(--youtube-color))",
          facebook: "hsl(var(--facebook-color))",
          twitch: "hsl(var(--twitch-color))",
          devto: "hsl(var(--devto-color))",
          codewars: "hsl(var(--codewars-color))",
          codepen: "hsl(var(--codepen-color))",
          freecodecamp: "hsl(var(--freecodecamp-color))",
          gitlab: "hsl(var(--gitlab-color))",
          hashnode: "hsl(var(--hashnode-color))",
          stackoverflow: "hsl(var(--stackoverflow-color))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", //8px
        md: "calc(var(--radius) - 2px)", //6px
        sm: "calc(var(--radius) - 4px)", //4px
      },
      boxShadow: {
        active: "var(--shadow) hsl(var(--primary) / 0.25)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
