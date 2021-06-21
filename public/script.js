(function () {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token');
  if (tokenFromUrl) {
    window.localStorage.setItem('token', tokenFromUrl);
  }

  const staticshieldsScript = document.querySelector('script[data-site-id]');
  const siteId = staticshieldsScript.getAttribute('data-site-id');
  const token = window.localStorage.getItem('token');

  console.log('-------from script--------');
  if (token == null || undefined || !token) {
    console.log(
      `https://staticshield.vercel.app/p/?id=${siteId}&redirecturl=${window.location.href
        .split('?')[0]
        .toString()}`
    );
    debugger;
    window.location.replace(
      `https://staticshield.vercel.app/p/?id=${siteId}&redirecturl=${window.location.href
        .split('?')[0]
        .toString()}`
    );
  }

  console.log('-------from script--------');
})();
