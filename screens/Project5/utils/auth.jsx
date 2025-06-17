import axios from 'axios';

const API_KEY = 'AIzaSyDvhLvxXoWrDjI1OnEw9TCz8UFsFLjNMXo';
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  
  
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return {
    token: response.data.idToken,
    userId: response.data.localId,
  };
}


export async function createUser(email, password, name) {
  const { token, userId } = await authenticate('signUp', email, password);

  

  const userData = {
    name
  };
  const response = await axios.put(
    `https://expensetracker-1e805-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
    userData
  );

  
  return { token, userId };
}


export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
