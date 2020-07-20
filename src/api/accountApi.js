import { post, get } from './api.js';

export async function getAccount() {
  return await get('/get-account');
}

export async function login(username, password) {
  return await post('/login', {"username": username, "password": password});
}

export async function logout(props) {
  return await post('/logout');
}

export async function register(username, email, password) {
  return await post('/register', {"username": username, "email": email, "password": password});
}

export async function update(data) {
  return await post('/update', data);
}