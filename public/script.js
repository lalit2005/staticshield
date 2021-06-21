(async function () {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token');
  if (tokenFromUrl) {
    window.localStorage.setItem('token', tokenFromUrl);
  }

  const staticshieldsScript = document.querySelector('script[data-site-id]');
  const siteId = staticshieldsScript.getAttribute('data-site-id');
  const token = window.localStorage.getItem('token');

  if (token == null || undefined || !token) {
    window.location.replace(
      `https://staticshield.vercel.app/p/?id=${siteId}&redirecturl=${window.location.href
        .split('?')[0]
        .toString()}`
    );
  }

  if (token) {
    const res = await fetch(
      'https://staticshield.vercel.app/api/verify-token/?token=' + token
      // 'http://localhost:3000/api/verify-token/?token=' + token
    );
    const data = await res.json();
    console.log(data);
    if (data.expired == true) {
      alert('Data expired');
      window.location.replace(
        `https://staticshield.vercel.app/p/?expired=1&id=${siteId}&redirecturl=${window.location.href
          // `http://localhost:3000/p/?expired=1&id=${siteId}&redirecturl=${window.location.href
          .split('?')[0]
          .toString()}`
      );
    }

    if (data.invalidtoken == true) {
      alert('Data expired');
      window.location.replace(
        `https://staticshield.vercel.app/p/?invalidtoken=1&id=${siteId}&redirecturl=${window.location.href
          .split('?')[0]
          .toString()}`
      );
    }
  }
})();
