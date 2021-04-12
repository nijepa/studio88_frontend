function saveToken(token) {
  localStorage.setItem("studio88_user", JSON.stringify(token));
}

function getToken() {
  return JSON.parse(localStorage.getItem("studio88_user"));
}

function removeToken() {
  localStorage.removeItem("studio88_user");
}

function updateToken(data) {
  const savedCred = JSON.parse(localStorage.getItem("studio88_user"));
  savedCred.user = data;
  localStorage.setItem("studio88_user", JSON.stringify(savedCred));
}

export { saveToken, getToken, removeToken, updateToken };
