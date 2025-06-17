import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const API_KEY='AIzaSyDvhLvxXoWrDjI1OnEw9TCz8UFsFLjNMXo'
const BACKEND_URL='https://expensetracker-1e805-default-rtdb.firebaseio.com/'

const refreshAuthToken = async () => {

  const token = await AsyncStorage.getItem('token');

  if (!token?.refreshToken) return null;

  try {
    const res = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const newIdToken = res.data.id_token;
    const newRefreshToken = res.data.refresh_token;

    await AsyncStorage.setItem(
      'token',
      JSON.stringify({ token: newIdToken, refreshToken: newRefreshToken }),
    );

    return newIdToken;
  } catch (err) {
    console.error('Error refreshing token', err);
    return null;
  }
};

const instance = axios.create({
  baseURL:BACKEND_URL ,
});

// Request interceptor
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.url += `?auth=${token.token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

 
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshAuthToken();

      if (newToken) {
        originalRequest.url = originalRequest.url.replace(
          /auth=[^&]+/,
          `auth=${newToken}`,
        );
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
