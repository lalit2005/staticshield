(function () {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token');
  if (tokenFromUrl) {
    window.localStorage.setItem('token', tokenFromUrl);
  }
  console.log('Seeettttteeeeddddddtoookkkeeeeenn');
})();
