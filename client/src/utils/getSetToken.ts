export function getToken() {
  const tokenString = localStorage.getItem('access_token');
  if (tokenString) {
    const token = JSON.parse(tokenString);
    return token;
  }
}

export function setToken(userToken: string) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}
