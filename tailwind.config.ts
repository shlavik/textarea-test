import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "#232323",
				secondary: "#F2F1F4",
				darkness: "#131216",
				button: {
					light: "#F2EDFD",
					DEFAULT: "#444444",
					dark: "#444444",
				},
				input: {
					active: "#353535",
					DEFAULT: "#353535",
					inactive: "#2E2E2E",
				},
				border: {
					active: "#FFFFFF42",
					DEFAULT: "#FFFFFF14",
					inactive: "#FFFFFF14",
				},
			},
			fontFamily: {
				sans: ["Sora", ...defaultTheme.fontFamily.sans],
			},
			screens: {
				us: "440px", // Ultra Small
			},
			boxShadow: {
				overlay:
					"inset 0 8rem 3rem -5rem #232323, inset 0 -8rem 4rem -4rem #232323",
			},
		},
	},
	plugins: [],
} satisfies Config;
