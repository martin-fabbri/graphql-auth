# Strongly Typed GraphQL with Apollo

[![CircleCI](https://circleci.com/gh/martin-fabbri/strongly-typed-graphql/tree/master.svg?style=svg)](https://circleci.com/gh/martin-fabbri/strongly-typed-graphql/tree/master)

## Setup

Setup docker:

```bash
cd backend
TODO: docker setup
```

Install client dependencies:

```bash
cd frontend
yarn
yarn dev
```

## Usage

To get this project running locally, you will need setup docker to run the backend server. 

```bash
docker-compose up
```

Start the frontend server

```bash
yarn dev
```

## Overview

We use Apollo's GraphQL implementation on server and client.

> [Apollo](https://www.apollographql.com/client/) is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.
>
> We integrate Apollo with Next by wrapping our _pages_ inside a [higher-order component (HOC)](https://facebook.github.io/react/docs/higher-order-components.html). Using the HOC pattern we're able to pass down a central store of query result data created by Apollo into our React component hierarchy defined inside each page of our Next application.
>
> On initial page load, while on the server and inside `getInitialProps`, we invoke the Apollo method, [`getDataFromTree`](https://www.apollographql.com/docs/react/features/server-side-rendering.html#getDataFromTree). This method returns a promise; at the point in which the promise resolves, our Apollo Client store is completely initialize.
>

On loading each route, we perform a `user` query to see if the current visitor is logged in (based on a cookie, more on that in a moment). Depending on the query result, and the route, the user may be [redirected](https://github.com/zeit/next.js/blob/master/examples/with-apollo-auth/lib/redirect.js) to a different page.

When creating an account, both the `createUser` and `signinUser` mutations are executed on our backend, which returns a token that can be used to authenticate the user for future requests. The token is stored in a cookie for easy access (_note: This may have security implications.).

A similar process is followed when signing in, except `signinUser` is the only mutation executed.

It is important to note the use of Apollo's `resetStore()` method after signing in and signing out to ensure that no user data is kept in the browser's memory.

### Note:

The `withData()` HOC must wrap a top-level component from within the `pages` directory. Wrapping a child component with the HOC will result in a `Warning: Failed prop type: The prop 'serverState' is marked as required in 'WithData(Apollo(Component))', but its value is 'undefined'` error. Down-tree child components will have access to Apollo, and can be wrapped with any other sort of `graphql()`, `compose()`, etc HOC's.

## Stack
WIP: Next.js, Apollo Client, Apollo Server, Typescript

## Docker Commands

docker build -t auth-backend .

docker run --name auth auth-backend
