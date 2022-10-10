export function getToken() {
  const tokenString = localStorage.getItem('access_token');
  if (tokenString) {
    const token = JSON.parse(tokenString);
    return token;
  }
}

export function setToken(userToken: string) {
  localStorage.setItem('access_token', JSON.stringify(userToken));
}

export function removeToken(keyName: string) {
  localStorage.removeItem('access_token');
}
