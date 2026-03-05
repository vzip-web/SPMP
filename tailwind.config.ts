import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                spBlack: '#050505',
                spRed: '#ff003c',
                spGold: '#ffd700',
                spGrey: '#1a1a1a',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                urban: ['var(--font-anton)'], // We'll use Anton or similar as the huge distressed urban font
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'noise': "url('/noise.png')",
            },
        },
    },
    plugins: [],
}
export default config
