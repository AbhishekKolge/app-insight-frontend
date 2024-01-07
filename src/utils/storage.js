import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = 'auth';

const saveAuthCookie = (auth) => {
  Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(auth), {
    expires: +process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

const getAuthCookie = () => {
  const auth = Cookies.get(AUTH_COOKIE_NAME);
  return auth && JSON.parse(auth);
};

const removeAuthCookie = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
};

export { saveAuthCookie, getAuthCookie, removeAuthCookie };
