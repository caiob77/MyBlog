import postcssImport from 'postcss-import';
import postcssNesting from 'tailwindcss/nesting/index.js';
import tailwindcss from 'tailwindcss';

export default {
    plugins: {
        'postcss-import': postcssImport,          // para combinar múltiplos arquivos css
        'tailwindcss/nesting': postcssNesting,
        tailwindcss: tailwindcss,
    }
};
