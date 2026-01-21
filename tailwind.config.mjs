/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Poppins', 'sans-serif'], // Fuente sans-serif por defecto
				'serif': ['Lora', 'serif'],
				'lora': ['Lora', 'serif'],
				'alice': ['Alice', 'serif'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				third: {
					DEFAULT: "hsl(var(--third))",
					foreground: "hsl(var(--third-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Brand colors
				brand: {
					teal: '#4EAC9F',       // Main brand teal/green
					green: '#4EAC9F',      // Alias for teal
					cream: '#FDF5E9',      // Background cream/beige
					darkGray: '#2D3748',   // Dark text
					charcoal: '#333638',   // Charcoal/dark gray
					gold: '#BBA882',       // Gold/tan color
				},
				// Direct color utilities
				teal: '#4EAC9F',
				charcoal: '#333638',
				gold: '#BBA882',
				// Legacy support (keep for now)
				brandGreen: '#4EAC9F',
				cardText: '#333638',
				subText: '#6B7280',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [],
}
