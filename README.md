# Matthew Loughnane x Gong | Take Home Test

Initially I created the page in my own style using components from ui.shadcn.com where applicable and tailwindcss.
After thinking on it, I added a toggle to show an much closer version to the one described in the document. My thinking being, Gong may be testing me on either:

1. My own interpretation of what looks good and works well.
2. How well I can follow a brief.

I've made a list any links I've used for reference and reasoning below.

Update: I added some small error catching in overtime.

# My Assumptions

- No AI coding help
- I can use a component library
  - I've used [ui.shadcn.com](https://ui.shadcn.com/docs/installation/vite)
- As noted in the Gong document, I've assumed the structure and content of the database is consisent
  - There is data in the database

# To Do
Thing I would like to add - but haven't because of time constraints.

- Add Tests
- Clean Up `auth-utils.ts`. (I've added a try/catch after the submission)
- Find a more accurate font (for exact view)
- Add `.env` variables
- Empty States - I've assumed there is data, it would be nice to have empty states
- Remove unnecessary CSS - I'm not sure about tree-shaking in Vite
- Add axios / tanstack query if expanding the number of API calls

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
