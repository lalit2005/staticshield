## StaticShield + Angular

![image](https://user-images.githubusercontent.com/69138026/159734420-a2870f34-52ac-4101-bd6b-3d33c47b3f7a.png)

## Protect a single page

You should just paste a snippet in that page that you want to password protect and add a `staticshield-div`
to the top level div. That's it. Really!

You can find the snippet in the dashbaord under the `Angular` section

![image](https://user-images.githubusercontent.com/69138026/159734590-591dee28-11ce-44f5-a2db-9bbfbf19dcfc.png)

And also don't forget to add `staticshield-div` class to the top level `div` of the page.

Finally a password protected Angular web page looks like

```ts highlight=13,14,15,16,17,18,19,20,21
// protected.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
})
export class ProtectedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://staticshield.vercel.app/script.js';
    script.dataset.siteId = '47935937-6c7d-4952-a363-b90c283f25d4';
    script.dataset.cap = 'The password is 123test123';

    document.querySelector('head')?.appendChild(script);
  }
}
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

Password protecting a whole app is just as easy as protecting a single page.

You will have to follow the same steps above to get everything right

A password protected Angular app's `app.component.ts` looks like

```ts highlight=10,14,15,16,17,18,19,20
// src/app.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'staticshield-angular-example';

  ngOnInit(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://staticshield.vercel.app/script.js';
    script.dataset.siteId = '47935937-6c7d-4952-a363-b90c283f25d4';
    script.dataset.cap = 'The password is 123test123';

    document.querySelector('head')?.appendChild(script);
  }
}
```
