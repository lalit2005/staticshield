## StaticShield + Nextjs 11

![image](https://user-images.githubusercontent.com/69138026/159731344-5d8bf6d2-fff3-40d2-81f5-774f5e611841.png)

## Protect a single page

Nextjs 11 was released very recently and its brand new `<Script />` tag just works seamlessly with StaticShield.

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

You can find the snippet in the dashbaord under the `Nextjs` section

![image](https://user-images.githubusercontent.com/69138026/159731375-15f33112-a2f9-4213-b8db-f2a4eb4bace5.png)

<Callout type="info">
	**Never** use `Link` tag from `next/link` while linking a password protected page. **Always use an anchor tag `<a>`.**
</Callout>

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

<Callout type="tip">
  If your page is very lightweight, includes no heavy javascript, and you are
  sure that javascript runs before the HTML renders, the `staticshield-div` is
  not required!
</Callout>

Finally a password protected Nextjs web page looks like

```js highlight=8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
// pages/secret-page.js

import Script from 'next/script';

const Page = () => {
  return (
    <div className='staticshield-div'>
      <Script
        src='https://staticshield.vercel.app/script.js'
        data-cap='<CAPTION>'
        data-site-id='<DATA-SITE-ID>'
        strategy='beforeInteractive'></Script>
      <style jsx>{`
        .staticshield-div {
          display: none;
        }
      `}</style>
      <noscript>
        <meta
          httpEquiv='refresh'
          content='0; url=https://staticshield.vercel.app/errors/noscript'
        />
      </noscript>
      <div class='max-w-5xl mx-auto …'>
        <h1>Hello world!</h1>
        // other content here…
      </div>
    </div>
  );
};
export default Page;
```

<Callout type="tip">
  The CSS part in the snippet can be added to the `styles/global.css` too
</Callout>

The highlighted part of code snippet is provided by StaticShield and all you have to do is just add that `staticshield-div`
class name to the top level div.

<Callout type="info">
	The `<DATA-SITE-ID>` and `<CAPTION>` fields will be prefilled in the dashbaord. You will just have to copy paste 😍
</Callout>

<Callout type="warning">
  If `staticshield-div` class is not assigned to the top level `div`, the user
  will see a flash of **password protected content** while the page loads
  initially.
</Callout>

## Password protect a whole app

Password protecting a whole app is just as easy as protecting a single page.

You will have to follow the same steps above to get everything right

A password protected Nextjs app's `_app.js` looks like

```js highlight=9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
// pages/_app.js

import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <div className='staticshield-div'>
      <Script
        src='https://staticshield.vercel.app/script.js'
        data-cap='<CAPTION>'
        data-site-id='<DATA-SITE-ID>'
        strategy='beforeInteractive'></Script>
      <style jsx>{`
        .staticshield-div {
          display: none;
        }
      `}</style>
      <noscript>
        <meta
          httpEquiv='refresh'
          content='0; url=https://staticshield.vercel.app/errors/noscript'
        />
      </noscript>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
```

<Callout type="tip">
  Again, the CSS part in the snippet can be added to the `styles/global.css` too
</Callout>
