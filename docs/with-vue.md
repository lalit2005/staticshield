## StaticShield + Vue.js

![image](https://user-images.githubusercontent.com/69138026/159732428-dba6b819-7049-4f6d-a68f-0759c11ffbec.png)

## Protect a single page

✅ **Coming really really soon**

Till then you can try to add the snippet in the `head` tag of the page with the help of [`vue-head`](https://www.npmjs.com/package/vue-head) NPM package.

If you happen to succeed using `vue-head`, please contribute to the docs by clicking the link in the footer 😀

## Password protect a whole app

First, go grab the Vue.js snippet from the [dasboard](https://staticshield.vercel.app/dashboard)

![image](https://user-images.githubusercontent.com/69138026/159732761-2aa2e556-4445-4122-a279-9a1189fee114.png)

You will have to add that script on the `<head>` of `public/index.html` of the Vue app.

A password protected Vue app's `public/index.html` looks like

```js highlight=11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
// public/index.html

<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
    <script
      src="https://staticshield.vercel.app/script.js"
      data-site-id="<DATA-SITE-ID>"
      data-cap="<CAPTION>"
    ></script>
    <style>
      .staticshield-div {
        display: none;
      }
    </style>
    <noscript>
      <meta
        http-equiv="refresh"
        content="0; url=https://staticshield.vercel.app/errors/noscript"
    /></noscript>
  </head>
  <body class="staticshield-div">
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

<Callout type="tip">
	The `<DATA-SITE-ID>` and `<CAPTION>` fields will be prefilled in the dashbaord. You will just have to copy paste 😍
</Callout>
