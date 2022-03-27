# pop-up-blocker-demo

This repo demonstrates various methods for navigating a user to a new window
without triggering a popup blocker, particularly when you need to wait for an
async operation like requesting an auth token.

<!-- TODO: Update this link -->

Read [the blog post](https://mikepalmer.dev/blog) for more details.

## Preview

Open this example on
[CodeSandbox](https://codesandbox.io/s/github/mpalmer685/pop-up-blocker-demo).

## Relevant files

- [`admin/index.tsx`](./app/routes/admin/index.tsx) - Defines
  [`LoginWithGet`](./app/routes/admin/index.tsx#L45) and
  [`LoginWithPost`](./app/routes/admin/index.tsx#L67) components, which handle
  opening a new window and making the auth token request.
- [`admin/login-as.tsx`](./app/routes/admin/login-as.tsx) - For the GET request,
  this file acts as a placeholder for your user. For the POST request, this also
  handles submitting the POST request once the auth token has been fetched.
- [`app/api/login.ts`](./app/routes/app/api/login.ts) - Handles both GET and
  POST requests to log into the "main" app.
