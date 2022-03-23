## StaticShield + HTML5

![image](https://user-images.githubusercontent.com/69138026/159733709-24e4cf4a-f147-44db-8199-b1ace281bf0d.png)

## Protect a single page

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

<Callout type="info">
  If your page is very lightweight, includes no heavy javascript, and you are
  sure that javascript runs before the HTML renders as shown in the demo video
  below, the `staticshield-div` is not required!
</Callout>

You can find the snippet in the dashbaord under the `Vanilla HTML, JS, CSS` section

![image](https://user-images.githubusercontent.com/69138026/159733928-59f9d5d7-d4a7-4912-91ab-7048593a8e6a.png)

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

Finally a password protected Vanilla HTML, JS, CSS web page looks like

```html highlight=11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
// protected.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StaticShield + HTML</title>
    <link rel="stylesheet" href="style.css" />
    <style>
      .staticshield-div {
        display: none;
      }
    </style>
    <script
      src="https://staticshield.vercel.app/script.js"
      data-site-id="<DATA-SITE-ID>"
      data-cap="CAPTION"
    ></script>
    <noscript>
      <meta
        http-equiv="refresh"
        content="0; url=https://staticshield.vercel.app/errors/noscript"
    /></noscript>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

<Callout type="tip">
	The `<DATA-SITE-ID>` and `<CAPTION>` fields will be prefilled in the dashbaord. You will just have to copy paste 😍.
</Callout>

The highlighted part of code snippet is provided by StaticShield and all you have to do is just add that `staticshield-div`
class name to the top level div.

<Callout type="warning">
  If `staticshield-div` class is not assigned to the top level `div`, the user
  will see a flash of **password protected content** while the page loads
  initially.
</Callout>

## Password protect a whole app

Password protecting an app that contains many pages and made with **only HTML** is a little difficult and a time consuming one
because you will have to add the snippet to all the the HTML pages as shown above.

Password protecting a whole app with many pages is going to be **much easier with any Javascript framework** of your choice
