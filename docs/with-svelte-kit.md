## StaticShield + SvelteKit

![image](https://user-images.githubusercontent.com/69138026/159731964-d42bbbdf-03b7-4bda-bc2f-b3e77fbf8144.png)

## Protect a single page

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

<Callout type="tip">
  If your page is very lightweight, includes no heavy javascript, and you are
  sure that javascript runs before the HTML renders as shown in the demo video
  below, the `staticshield-div` is not required!
</Callout>

You can find the snippet in the dashbaord under the `Svelte Kit` section

![image](https://user-images.githubusercontent.com/69138026/159731987-c5504c94-d971-4d69-9f6e-3c887870e712.png)

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

Finally a password protected SvelteKit web page looks like

```html highlight=7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
// src/routes/protected.svelte

<script>
  console.log('Hello world');
</script>

<svelte:head>
  <script
    data-cap="<CAPTION>"
    data-site-id="<DATA-SITE-ID>"
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
  <!-- ... -->
</main>

<style>
  /* ... */
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

You will have to add the same script on the `<head>` of `public/index.html` of the Svelte app after removing the
`<svelte:head>`s.

A password protected Svelte app's `public/index.html` looks like

```js highlight=7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22
// src/app.html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="/favicon.png" />
		<script
		data-cap="<CAPTION>"
		data-site-id="<DATA-SITE-ID>"
		src="https://staticshield.vercel.app/script.js"/>
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
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%svelte.head%
	</head>
	<body>
		<div id="svelte">%svelte.body%</div>
	</body>
</html>

```

<Callout type="tip">
	The `<DATA-SITE-ID>` and `<CAPTION>` fields will be prefilled in the dashbaord. You will just have to copy paste 😍
</Callout>
