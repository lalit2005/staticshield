(async function () {
  const params = new URLSearchParams(window.location.search);
  // base url
  const B_URL = 'https://staticshield.vercel.app';
  const tokenFromUrl = params.get('token');
  if (tokenFromUrl) {
    window.localStorage.setItem('staticshield-token', tokenFromUrl);
  }

  const staticshieldsScript = document.querySelector('script[data-site-id]');
  const siteId = staticshieldsScript.getAttribute('data-site-id');
  const caption = staticshieldsScript.getAttribute('data-cap');
  const token = window.localStorage.getItem('staticshield-token');

  if (token == null || undefined || !token) {
    window.location.replace(
      `${B_URL}/p/?id=${siteId}&cap=${caption}&redirecturl=${window.location.href
        .split('?')[0]
        .toString()}`
    );
  }

  if (token) {
    const res = await fetch(
      `https://staticshield.glitch.me/verify-token/?token=` +
        decodeURIComponent(token)
      // 'http://localhost:3000/api/verify-token/?token=' + token
    );
    const data = await res.json();
    console.log(data);
    if (data.expired == true) {
      window.location.replace(
        `${B_URL}/p/?expired=1&id=${siteId}&cap=${caption}&redirecturl=${window.location.href
          // `http://localhost:3000/p/?expired=1&id=${siteId}&redirecturl=${window.location.href
          .split('?')[0]
          .toString()}`
      );
    }

    if (data.invalidtoken == true) {
      window.location.replace(
        `${B_URL}/p/?invalidtoken=1&cap=${caption}&id=${siteId}&redirecturl=${window.location.href
          .split('?')[0]
          .toString()}`
      );
    }
    if (data.invalidtoken == false && data.expired == false) {
      window.staticshieldToken = localStorage.getItem('staticshield-token');
      let asd = document
        .querySelector('.staticshield-div')
        .classList.toggle('staticshield-div');
      console.log(asd);
    }
  }
})();

window.logout = (redirecturl) => {
  window.localStorage.removeItem('staticshield-token');
  window.history.replaceState(null, null, redirecturl || '/');
  window.location.reload();
};
