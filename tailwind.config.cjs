/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
	darkMode: "class", // permite alternar o modo escuro manualmente
	theme: {
		extend: {
			colors: {
				electric: "var(--electric-border-color)",
				"electric-light": "var(--electric-light-color)",
			},
			fontFamily: {
				sans: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
				montserrat: ["Montserrat", "Helvetica Neue", "Arial", "sans-serif"],
			},
			letterSpacing: {
				widest2: "0.3em",
				widest3: "0.4em",
			},
			keyframes: {
				fadeColor: {
					"0%": { color: "white" },
					"20%": { color: "rgba(255,255,255,0.3)" },
					"100%": { color: "rgba(255,255,255,0.3)" },
				},
				slideDown: {
					"0%": { opacity: "0", transform: "translateY(-15px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				fadeColor: "fadeColor 5s ease infinite 3s",
				slideDown: "slideDown 0.5s ease forwards",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
