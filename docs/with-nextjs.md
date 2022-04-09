## StaticShield + Nextjs

![image](https://user-images.githubusercontent.com/69138026/159726920-2113a3e6-5c38-47fb-9f34-f102194e6778.png)

## Protect a single page

Nextjs 11 was released very recently and its brand new `<Script />` tag just works seamlessly with StaticShield.
But if you cannot upgrade your website/web app to the latest version of Nextjs, it's fine! StaticShield works with
previous versions of Nextjs too!

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

<Callout type="info">
  If your page is very lightweight, includes no heavy javascript, and you are
  sure that javascript runs before the HTML renders as shown in the demo video
  below, the `staticshield-div` is not required!
</Callout>

<Loom url="https://www.loom.com/share/d591d8f7bc784fc89240993e660f6898" title="StaticShield + Next.js demo" />

You can find the snippet in the dashbaord under the `Nextjs(<v11)` section

![image](https://user-images.githubusercontent.com/69138026/159728134-f40bd0ff-b287-4a40-a7fe-447a1556c5b3.png)

<Callout type="warning">
	**Never** use `Link` tag from `next/link` while linking a password protected page. **Always use an anchor tag `<a>`.**
</Callout>

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

Finally a password protected Nextjs web page looks like

```js highlight=10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26
// pages/secret-page.js

import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="staticshield-div">
      <Head>
        <script
          src="https://staticshield.vercel.app/script.js"
          data-cap='<CAPTION>'
          data-site-id='<DATA-SITE-ID>'
          strategy="beforeInteractive"
        />
        <style jsx>{`
          .staticshield-div {
            display: none;
          }
        `}</style>
        <noscript>
          <meta
            httpEquiv="refresh"
            content="0; url=https://staticshield.vercel.app/errors/noscript"
          />
        </noscript>
      </Head>
			<div>

			</div>
    </div>
  );
}

export default Page
```

<Callout type="tip">
  The CSS part in the snippet can be added to the `styles/global.css` too
</Callout>

The highlighted part of code snippet is provided by StaticShield and all you have to do is just add that `staticshield-div`
class name to the top level div.

<Callout type="tip">
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

```js highlight=10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26
// pages/_app.js

import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <div className='staticshield-div'>
      <Head>
        <script
          src='https://staticshield.vercel.app/script.js'
          data-cap='<CAPTION>'
          data-site-id='<DATA-SITE-ID>'
          strategy='beforeInteractive'
        />
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
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
```

<Callout type="tip">
  Again, the CSS part in the snippet can be added to the `styles/global.css` too
</Callout>
