const Auth = {
  setToken(data) {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('expiration', data.expires_in + Date.now());
  },
  getToken() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return null;
    }
    if (Date.now() > parseInt(String, expiration)) {
      this.destroyToken();
      return null;
    }
    return token;
  },
  destroyToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  },
  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  },
  getAuthHeader() {
    return `Authorization: Bearer ${this.getToken()}`;
  },
  setRememberMe(data) {
    localStorage.setItem('rememberUserName', (data.rememberMe) ? data.username : '');
  },
};

export default Auth;
