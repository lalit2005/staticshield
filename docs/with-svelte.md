## StaticShield + Svelte

![image](https://user-images.githubusercontent.com/69138026/159731091-b9241d1d-656a-4fe5-b71c-ce413345a987.png)

## Protect a single page

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

<Callout type="tip">
  If your page is very lightweight, includes no heavy javascript, and you are
  sure that javascript runs before the HTML renders as shown in the demo video
  below, the `staticshield-div` is not required!
</Callout>

You can find the snippet in the dashbaord under the `Svelte` section

![image](https://user-images.githubusercontent.com/69138026/159731148-88449eca-07b9-4833-a593-b6e5c3226507.png)

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

Finally a password protected Svelte web page looks like

```html highlight=3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
// src/App.svelte

<svelte:head>
  <script
    data-site-id="<DATA-SITE-ID>"
    data-cap="<CAPTION>"
    src="https://staticshield.vercel.app/script.js"
  />
  <style>
    .staticshield-div {
      display: none;
    }
  </style>
  <noscript>
    <meta
      http-equiv="refresh"
      content="0; url=https://staticshield.vercel.app/errors/noscript"
    />
  </noscript>
</svelte:head>

<main class="staticshield-div">
  <h1>Hello world</h1>
  <!-- ... -->
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  // ...
</style>
```

The highlighted part of code snippet is provided by StaticShield and all you have to do is just add that `staticshield-div`
class name to the top level div.

<Callout type="warning">
  If `staticshield-div` class is not assigned to the top level `div`, the user
  will see a flash of **password protected content** while the page loads
  initially.
</Callout>

## Password protect a whole app

Password protecting a whole app is just as easy as protecting a single page.

You will have to add the same script on the `<head>` of `public/index.html` of the Svelte app after changing the
`<svelte:head>`s to just `<head>`s

A password protected Svelte app's `public/index.html` looks like

```html highlight=9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
// public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title>StaticShield + Svelte</title>

    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/global.css" />
    <link rel="stylesheet" href="/build/bundle.css" />

    <script defer src="/build/bundle.js"></script>

    <script
      data-site-id="<DATA-SITE-ID>"
      data-cap="<CAPTION>"
      src="https://staticshield.vercel.app/script.js"
    />
    <style>
      .staticshield-div {
        display: none;
      }
    </style>
    <noscript>
      <meta
        http-equiv="refresh"
        content="0; url=https://staticshield.vercel.app/errors/noscript"
      />
    </noscript>
  </head>

  <body></body>
</html>
```

<Callout type="tip">
	The `<DATA-SITE-ID>` and `<CAPTION>` fields will be prefilled in the dashbaord. You will just have to copy paste 😍
</Callout>