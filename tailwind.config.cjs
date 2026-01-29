const round = (num) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, '$1')
        .replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;

module.exports = {
    purge: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/ramp-config-editor_editeur-config-pcar/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'base' // only generate global styles
        })
    ]
};
