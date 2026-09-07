/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                navy: {
                    50: '#eef2ff',
                    100: '#dbe4ff',
                    200: '#bfcfff',
                    300: '#93aafd',
                    400: '#6479fa',
                    500: '#4050f4',
                    600: '#2e30e9',
                    700: '#2524cf',
                    800: '#2320a8',
                    900: '#1B2559',
                    950: '#111340',
                },
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
}
