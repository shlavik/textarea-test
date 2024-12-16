import type { Config } from "tailwindcss";

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
				sans: ["Sora", "Roboto"],
			},
			screens: {
				us: "496px", // Ultra Small
			},
			boxShadow: {
				user: "-0.25rem -0.25rem 1.25rem #FF121688",
				overlay:
					"inset 0 7rem 3rem -6rem #232323, inset 0 -7rem 3rem -5rem #232323",
			},
			keyframes: {
				flicker: {
					"0%, 100%": { opacity: "1" },
					"40%": { opacity: "0.6" },
				},
			},
			animation: {
				flicker: "flicker 800ms infinite",
				"flicker-once": "flicker 200ms",
			},
		},
	},
	plugins: [],
} satisfies Config;
