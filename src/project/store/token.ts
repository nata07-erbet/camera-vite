type TToken = string;

const getToken = (): TToken => {
  const token = window.localStorage.getItem('TOKEN');
  return token ?? '';
};

const saveToken = (token: TToken) => {
  window.localStorage.setItem('TOKEN', token);
};

const dropToken = () => {
  window.localStorage.removeItem('TOKEN');
};

export { getToken, saveToken, dropToken };
