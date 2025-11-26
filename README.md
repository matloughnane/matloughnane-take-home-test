# Matthew Loughnane x Gong | Take Home Test

Initially I created the page in my own style using components from ui.shadcn.com where applicable and tailwindcss.
After thinking on it, I added a toggle to show an much closer version to the one described in the document. My thinking being, Gong may be testing me on either:

1. My own interpretation of what looks good and works well.
2. How well I can follow a brief.

I've made a list any links I've used for reference and reasoning below.

# My Assumptions

- No AI coding help
- I can use a component library
  - I've used [ui.shadcn.com](https://ui.shadcn.com/docs/installation/vite)
- As noted in the Gong document, I've assumed the structure and content of the database is consisent

# To Do

- Add Tests
- Clean Up the `auth-utils.ts` so that it's
- Find a more accurate font (for exact view)
- Add `.env` variables

# Links

The links I used for documentation of better understanding

From the email:
https://vite.dev/guide/#scaffolding-your-first-vite-project

For the routing:
(I usually use NextJS (file based routing), and needed a refresher on React routing methods)
https://reactrouter.com/start/framework/routing

And programmatic navigation:
https://reactrouter.com/start/framework/navigating#usenavigate

For Auth Context:
(I also viewed an existing project I had)
https://react.dev/reference/react/useContext

For Auth Context / Logging Out:
https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem

For Memo:
(I had a syntax issue)
https://react.dev/reference/react/useMemo

# Pre-req Functions

`auth-utils.ts` contains the functions from Gong.
