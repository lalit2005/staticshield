How Staticshield works?

For StaticShield to work on your site, you will have to inject a small snippet that you can find in your
[sites dashboard](https://staticshield.vercel.app/dashboard).

It is a **really small** script (a little more than a kilo byte), therefore it does not slow down your page at any costs. And other thing that it requires is just `staticshield-div` class (or className in react ecosystem)
on the top level `div` of the page.

This script looks like below for password protecting a HTML page

```
<script src='https://staticshield.vercel.app/script.js' data-site-id='<SITE-ID>' data-cap='<CAPTION>'></script>
<noscript>
	<meta http-equiv='refresh' content='0; url=https://staticshield.vercel.app/errors/noscript'/>
</noscript>
```

The `<SITE-ID>` and `<CAPTION>` are the two fields you will find in dashboard itself. You will be able to
find the complete snippet there with prefiled `<SITE-ID>` and `<CAPTION>` fields. All you have to do copy
paste it in the right place and you can find that place here in the docs.

If you are not getting this, that's fine. You can directly jump into
your favourite framework's documentation part and you will find everything needed there 😀

## Under the hood

When the password protected page with the snippet loads, the script looks for a valid `token` in the browser
storage. If it does not find one, it will redirect you/the end user to a StaticShield hosted login page
where the user will be able to login with password

If the script finds a `token`, it validates it by sending it to StaticShield's servers. If the `token` is valid, the user is
then allowed to view and interact with the webpage.

If the `token` happens to be invalid, the user is then redirected to the login page. The token does not becomes invalid
usually unless it is edited/modified by anyone manually.

The `token` also becomes invalid if it has been expired. The expiration duration can be increased or decreased in the dashboard.

Now you can start integrating StaticShield in your website now.
