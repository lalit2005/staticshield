StaticShield can be self hosted

If you're interested in having your own instance of StaticShield, follow the steps below.

## Authentication

Sign up to Auth0 and follow the [Getting Started steps](https://github.com/auth0/nextjs-auth0#getting-started) for `nextjs-auth0`.

<Callout type="warning">
  Don't forget to configure the Allowed Callback and Logout URLs.
</Callout>

<Accordion title='Environment variables from this step'>
`AUTH0_SECRET`= Execute the [generate-secret](#generate-secret) command for suitable and secure strings  
`AUTH0_BASE_URL`=  
`AUTH0_ISSUER_BASE_URL`=  
`AUTH0_CLIENT_ID`=  
`AUTH0_CLIENT_SECRET`=  
</Accordion>

## Database

Sign up to HarperDB and create an instance on [their Studio](https://studio.harperdb.io/sign-up).

- Choose the cloud provider of your preference
- Give the instance a name and give its credentials
- Pick the specs for the instance - there's a free tier available
- Review the information and confirm the instance creation

<Callout type="info">
  It can take minutes to create a HarperDB instance.
  Stretch your legs and drink some water while you wait for it.
</Callout>

<Accordion title='Environment variables from this step'>
`HARPERDB_URL`=  
`HARPERDB_KEY`=
</Accordion>

## JWT Tokens

StaticShield uses [JSON Web Tokens (JWT)](https://jwt.io/) and requires some environment variables to work with them. You can use the same [generate-secret](#generate-secret) command for suitable and secure strings.

<Accordion title='Environment variables from this step'>
`HASH_SECRET`=  
`JWT_TOKEN`=  
`TOKEN_SECRET`=  
</Accordion>

## Base URL

To generate the script and all the URLs correctly, pointing to your instance, add a new environment variable called `NEXT_PUBLIC_BASE_URL` pointing to the same domain as the `AUTH0_BASE_URL` variable.

<Callout type="info">
  We don't use the same environment variable because in providers like Vercel, the variable needs to be prefixed with `NEXT_PUBLIC_` to be exposed to the front-end.
</Callout>

## Final steps

Confirm that you have all these environment variables configured on your preferred provider and that you run the `build` script during deployment.

```
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
HARPERDB_URL=
HARPERDB_KEY=
HASH_SECRET=
JWT_TOKEN=
TOKEN_SECRET=
NEXT_PUBLIC_BASE_URL=
```

We can recommend hosting on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Make sure to specify the environment variables when deploying for the first time.

## Commands

### Generate secret

```sh
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```
