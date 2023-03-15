# Used commands

## NPM init

`npm init -y` to initialize npm with a default package.json file

## Prettier

`npm install --save-dev prettier`
`npm i -D prettier@2.7.1`

Open VSCode settings (`Ctrl + ,`) and enable `Format on Save` and in Prettier settings mark `require config` enabled.
Type formatter on settings and set 'Prettier' as default formatter

## ESLint

`npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0`

## Vite

`npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0`

## React

`npm install react@18.2.0 react-dom@18.2.0`

## Lint Plugins

`npm i -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8`

## React Hooks Lint Plugins

`npm i -D eslint-plugin-react-hooks@4.6.0`

## Dev Tools

Using Vite if you use `vite` command it will use `NODE_ENV=development`, if you use `vite build` it will use `NODE_ENV=production`. This will improve the size and the performance of React.

## Strict Mode

If you wrap your app in `<React.StrictMode></React.StrictMode>` it will give you additional warnings about things you shouldn't be doing.

## Routing

Install: `npm i react-router-dom@6.4.1`

## React Query

`npm i @tanstack/react-query@4.10.1`

Most difficult part of react is handle `useEffect`. React Query will help you to remove effects.
Optimize the number of effects of your app is the secret for create maintainable React Apps.
