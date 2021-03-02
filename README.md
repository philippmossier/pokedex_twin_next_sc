# Run this app

1. clone repo
2. `npm install`
3. `npm run dev`
4. dev server on localhost:3000

## Create PROD build and serve

1. `npm run export`
2. `npx serve -s out`
3. test build on localhost:5000

## Run tests

`npm run test`

## Short description

App has 2 Pages.
`index.tsx` and `details/[id].tsx`
You can use either the pagination or the search-form browsing through all the 898 Pokemons.

## Build with

- [Nextjs](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Styled-Components](https://styled-components.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Twin](https://github.com/ben-rogerson/twin.macro)

### Why tailwindcss and styled-components?

- More flexibility and readabilty.
- In production tailwindcss compiles to styled components with plain-css.
- Wanted to try something new.