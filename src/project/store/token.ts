
type TToken = string;

const getToken = (): TToken => {
  const token = window.localStorage.getItem('token');
  return token ?? '';
};

const setToken = (token: TToken) => {
  window.localStorage.setItem('token', token);
};

const dropToken = () => {
  window.localStorage.removeItem('token');
};

export { getToken, setToken, dropToken };

