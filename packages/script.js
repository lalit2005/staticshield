import BASE_URL from '../lib/baseUrl';

(async function () {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token');
  if (tokenFromUrl) {
    window.localStorage.setItem('staticshield-token', tokenFromUrl);
  }

  const staticshieldsScript = document.querySelector('script[data-site-id]');
  const siteId = staticshieldsScript.getAttribute('data-site-id');
  const token = window.localStorage.getItem('staticshield-token');

  if (!token) {
    window.location.replace(
      `${BASE_URL}/p/${siteId}/?&redirecturl=${window.location.href
        .split('?')[0]
        .toString()}`
    );
    return;
  }

  if (token) {
    const res = await fetch(
      `${BASE_URL}/api/verify-token?token=` + decodeURIComponent(token)
    );
    const data = await res.json();
    console.log(data);
    if (data.expired == true) {
      window.location.replace(
        `${BASE_URL}/p/${siteId}/?expired=1&redirecturl=${window.location.href
          .split('?')[0]
          .toString()}`
      );
    }

    if (data.invalidtoken == true) {
      window.location.replace(
        `${BASE_URL}/p/${siteId}/?invalidtoken=1&&redirecturl=${window.location.href
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
