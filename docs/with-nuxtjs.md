## StaticShield + Nuxtjs

![image](https://user-images.githubusercontent.com/69138026/159733130-a08ee949-3871-4c3f-a3cb-d4a2082547d9.png)

## Protect a single page

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

<Callout type="info">
  If your page is very lightweight, includes no heavy javascript, and you are
  sure that javascript runs before the HTML renders as shown in the demo video
  below, the `staticshield-div` is not required!
</Callout>

You can find the snippet in the dashbaord under the `NuxtJS` section

![image](https://user-images.githubusercontent.com/69138026/159733249-cb562ef3-fc92-4618-a7ae-577cfbc790fd.png)

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

Finally a password protected Nuxt.js web page looks like

```js highlight=7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
// pages/protected.vue

<template>
  <div class="staticshield-div">
    <!-- ... -->
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: 'StaticShield + Nuxtjs',
        script: [
          {
            hid: 'staticshield',
            src: 'https://staticshield.vercel.app/script.js',
            'data-site-id': 'fbe1e7da-d79b-4265-8209-a14f099d838e',
            'data-cap': 'The password is 123test123',
          },
        ],
      }
    },
  }
</script>

<style>
  .staticshield-div {
    display: none;
  }
</style>
```

The highlighted part of code snippet is provided by StaticShield and all you have to do is just add that `staticshield-div`
class name to the top level `div` in `template`.

<Callout type="warning">
  If `staticshield-div` class is not assigned to the top level `div`, the user
  will see a flash of **password protected content** while the page loads
  initially.
</Callout>

## Password protect a whole app

Password protecting a whole app is just as easy as protecting a single page.

You will have to add the same script on the `<head>` of `layout/default.vue` of the Nuxt app.

A password protected Vue app's `layout/default.vue` looks like

```js highlight=10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
// layout/default.vue

<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'StaticShield + Nuxtjs',
      script: [
        {
          hid: 'staticshield',
          src: 'https://staticshield.vercel.app/script.js',
          'data-site-id': '<DATA-SITE-ID>',
          'data-cap': '<CAPTION>',
        },
      ],
    }
  },
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
</style>
```

<Callout type="tip">
	The `<DATA-SITE-ID>` and `<CAPTION>` fields will be prefilled in the dashbaord. You will just have to copy paste 😍
</Callout>