import axios from 'axios';

const baseURL = 'https://express-training.herokuapp.com/api';
const token = localStorage.getItem('jwtToken');

const callApi = async (method, url, userData) => {
  try {
    return await axios({
      method,
      url: `${baseURL}${url}`,
      data: userData,
      headers: {
        'Authorization': token,
      }
    });
  } catch (error) {
    return error.message;
  }
};

export default callApi;
