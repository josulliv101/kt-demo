var _token = null,
    _user = {};

export default {
  token: _token,
  user: _user,
  isAnonymous: () => !_token,
  setToken: (token) => _token = token,
  setUser: (user) => _user = user,
  clear: () => {
    _user = {};
    _token = null;
  }
}
