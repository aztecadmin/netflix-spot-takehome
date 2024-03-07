# Boba Finder

**Author:** Amanuel Zeryihun

**Live Link:** [https://king-prawn-app-94dui.ondigitalocean.app/](https://king-prawn-app-94dui.ondigitalocean.app/)

## About the project

Full stack web application demonstrating UI best practices for modularity, component testing, file structure, state management, and general software design.

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

### Project Structure

Although the project's scope is relatively small, I chose to employ best practices for my file structure that can accommodate feature and team growth. My approach is a hybrid between Domain Driven Design and [Component Driven Design](https://www.componentdriven.org/).

As such, I have two main sub-directories: 
- `components/common`, which as it sounds is where I store simple reusable components (such as the Radio dropdown picker component)
- `components/features` which is where I store higher level components that drive business logic.

I place feature-specific sub-components in the component directory of the respective feature (e.g., `/featureA/components/`) when these sub-components are custom-made for the feature and are not intended for reuse in other parts of the application.

### Tests

Component level tests are stored within each component's container folder.

I wrote my tests using [Vitest](https://vitest.dev/) in conjunction with Jest, and React testing library.

I wrote tests for all common and feature level components. I wrote the most extensive tests for FilterableTableComponent because that is where most of the complexity in the app lies. FilterableTableComponent tests are essentially e2e tests that make sure that data fetching and pagination act as expected in response to various user interactions with its constituent "atomic" components.

### Data fetching

I chose to leverage Apollo GraphQL (server and client) to pass data between the server and client.

Apollo was extremely useful. I was able to generate typescript types that were consumable on the frontend which made the development process very comfortable.
