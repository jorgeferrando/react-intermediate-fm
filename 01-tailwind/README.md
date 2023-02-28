# react-intermediate-fm

## Tailwind

To install all you need for tailwind run:
`npm i -D tailwindcss@3.1.8 postcss@8.4.18 autoprefixer@10.4.12`

Then create the `tailwind.config.js` & `postcss.config.js` files:
`npx tailwindcss init -p`

And add which files it has to check in `tailwind.config.js`:
`content: ["./src/**/*.{js,ts,jsx,tsx,html}"],`

To remove '@' css rules error go to settings json and add the line:
`"css.lint.unknownAtRules": "ignore"`

Installar el plugin de VSCode `Tailwind CSS IntelliSense`

Installar el prettier the tailwind:
`npm i -D prettier-plugin-tailwindcss` y crear el fichero prettier.config.js
