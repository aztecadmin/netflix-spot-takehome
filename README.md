# Netflix Boba Finder

**Author:** Amanuel Zeryihun

**Live Link:** [https://king-prawn-app-94dui.ondigitalocean.app/](https://king-prawn-app-94dui.ondigitalocean.app/)

## About the project

This application is submitted for review as part of the interview process for the L5 senior full stack engineer position at Netflix. The code was written entirely by I, Amanuel Zeryihun.

### Frameworks

I chose to use React + Typescript + [Vite](https://vitejs.dev/) for the client side and NodeJs for the API server.

### Setting Up the Project locally

I intended to create docker files for both the ui and api and a docker-compose script to host their corresponding images in a local container, but I ran into some issues with vitest and didn't want to prolong my submission.

Running both the ui and api should be relatively straightforward. From either sub-directory (ui or api) run `npm install`.

Start off on the main branch.

- Command to run the ui in dev mode: `npm run dev`
- Command to run the api: `npm run start`

**Note** that you need to store your Yelp API key as an environment variable from within the api folder first before running the api server.

export YELP_API_KEY

Or if you'd like to manually replace the api key in the api code, replace the env reference with your key inside of the entry file at line 26.

### How I spent my time

My time was spent mainly on the UI (70%), although setting up the Apollo server took meaningful effort.

My main concerns were typing my data accurately on the UI, file structure management, creating a healthy level of modularity in the component design and testing.

As mentioned earlier, I was able to automatically generate typescript types for my graphql entities by leveraging the graphql-codegen command line interface.

I would have liked to have spent more time writing better tests, implementing a style theme, making the app mobile-friendly and responsive, and further modularizing aspects of how the code fetches "config" data: for example, I currently hardcode the Netflix locations within the UI, but it would be better to fetch this and potentially other configuration related items from the backend upon startup of the app. Thus, it would have been better if I had created a processor to handle remote configuration, even if I were to have leveraged mock configs in the interim.

### Project Structure

Although the project's scope is relatively small, I chose to employ best practices for my file structure that can accommodate feature and team growth. My approach is a hybrid between Domain Driven Design and [Component Driven Design](https://www.componentdriven.org/).

As such, I have two main sub to directories components: common, which as it sounds is where I store simple reusable components (such as the Radio dropdown picker component), and "features" which is where I store higher level components that drive business logic.

I store sub-components within a features "component" directory if the feature depends on bespoke components which won't be used elsewhere in the app.

### Tests

Component level tests are stored within each component's container folder.

I wrote my tests using [Vitest](https://vitest.dev/) in conjunction with Jest, and React testing library.

I wrote extensive tests for FilterableTableComponent. These tests are essentially integration tests to make sure that data fetching and pagination act as expected in response to various user interactions with the "atomic" components that make up the page.

### Data fetching

I chose to leverage Apollo GraphQL (server and client) to pass data between the server and client.

Apollo was extremely useful. I was able to generate typescript types that were consumable on the frontend which made the development process very comfortable.

You can view the Apollo graphql explorer at :4000 of either your local version of the app or the live version (see above for live url).

### Learnings

I really enjoyed the process of re-familiarizing myself with Apollo. I see a lot of benefit (and some drawbacks) to relying on typed data structures that the client and api can share.

As always, part of the dance in this project entailed being mindful of how to balance the desire to modularize and optimize data structures with time. For example, I intentionally didn't leverage React's context or reducer APIs because, quite frankly, the scope of this project didn't require it. It's perfectly fine to have a parent component manage state for its children so long as this doesn't lead to the need for excessive prop. Also, I found myself realizing some inefficiencies in my design after creating/implementing it. This is normal in the real world. The key is to assess how limiting those inoptimalities are and re-design when necessary.
