# Netflix Boba Finder

**Author:** Amanuel Zeryihun

**Live Link:** [https://king-prawn-app-94dui.ondigitalocean.app/](https://king-prawn-app-94dui.ondigitalocean.app/)

## About the project

This project is submitted for review as part of the interview process for the L5 senior full stack engineer position at Netflix. The code was written entirely by I, Amanuel Zeryihun.

### Frameworks

I chose to use React + Typescript + [Vite](https://vitejs.dev/) for the client side and NodeJs for the API server.

### Setting Up the Project locally

I intended to create a docker-compose script to host the api and ui in a local container, but I ran into some issues with Vitest and didn't want to prolong my submission.

Running both the ui and api should be relatively straightforward.

**(Use Node v18.17.1 or better)**

1. Clone from the main branch.

2. Run `npm install` in both sub-directories (ui and api).

3. Setup the correct Environment Variables

   1. Store your Yelp API key as an environment variable `YELP_API_KEY` in a `.env` file from within the `api` folder first before running the api server`.
   2. Point the UI to your Apollo Client by defining the `VITE_APOLLO_CLIENT_URL` in a `.env` file from within the `ui` folder first before running the UI .

4. Run the project

   1. First run the api `npm run start` from within the `api` folder (Note: You can view the Apollo graphql explorer at port `:4000` of your local version of the app.)
   2. Then run the ui in dev mode: `npm run dev` from within the `ui` folder

5. Run UI tests
   1. Run `npm run test` from within the `ui` directory.

### How I spent my time

My time was spent mainly on the UI (70%), although setting up the Apollo server took meaningful effort.

My main concerns were using accurate types for my data on the UI, file structure management, creating a healthy level of modularity in the component design and testing.

I would have liked to spent more time doing the following

- Improve tests by adding more coverage and using more robust methods of accessing html elements within tests;
- Come up with a more scaleable/re-usable way of generating mock data and mock queries for tests
- Create more modularity around constant names throughout the app
- Implement error handling throughout the app
- Implement a style theme
- Make the app mobile-friendly and responsive
- Further modularize aspects of how the code fetches "config" data: for example, I currently hardcode the Netflix locations within the UI, but it would be better to fetch this and potentially other configuration related items from the backend upon startup of the app.
- Further modularize my different table components depending on additional use cases that the app needs to support (e.g. the user can search more than just boba).
- Choose and stick to a correct naming convention for "Store" and "Shop". (At some point, I started using these terms interchangeably and made a note to fix this but never got back to it.)

### Project Structure

Although the project's scope is relatively small, I chose to employ best practices for my file structure that can accommodate feature and team growth. My approach is a hybrid between Domain Driven Design and [Component Driven Design](https://www.componentdriven.org/).

As such, I have two main sub to directories components: common, which as it sounds is where I store simple reusable components (such as the Radio dropdown picker component), and "features" which is where I store higher level components that drive business logic.

I store sub-components within a features "component" directory if the feature depends on bespoke components which won't be used elsewhere in the app.

### Tests

Component level tests are stored within each component's container folder.

I wrote my tests using [Vitest](https://vitest.dev/) in conjunction with Jest, and React testing library.

I wrote tests for all common and feature level components. I wrote the most extensive tests for FilterableTableComponent because that is where most of the complexity in the app lies. FilterableTableComponent tests are essentially e2e tests that make sure that data fetching and pagination act as expected in response to various user interactions with its constituent "atomic" components.

### Data fetching

I chose to leverage Apollo GraphQL (server and client) to pass data between the server and client.

Apollo was extremely useful. I was able to generate typescript types that were consumable on the frontend which made the development process very comfortable.

### Learnings

I really enjoyed the process of re-familiarizing myself with Apollo. I see a lot of benefit (and some drawbacks) to relying on typed data structures that the client and api can share.

As always, part of the dance in this project entailed being mindful of how to balance the desire to modularize and optimize data structures with time. For example, I intentionally didn't leverage React's context or reducer APIs because, quite frankly, the scope of this project didn't require it. It's perfectly fine to have a parent component manage state for its children so long as this doesn't lead to the need for excessive prop drilling. Also, I found myself realizing some inefficiencies in my design after creating/implementing it. This is normal in the real world. The key is to assess how limiting those inoptimalities are and re-design when necessary.
