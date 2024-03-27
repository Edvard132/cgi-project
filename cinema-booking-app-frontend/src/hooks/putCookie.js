import Cookie from 'js-cookie';

const PutCookie = (cookiename, value) => {
  Cookie.set(cookiename, value, { expires: 1 });
};

export default PutCookie;
