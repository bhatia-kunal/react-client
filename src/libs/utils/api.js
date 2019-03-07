import axios from 'axios';

const baseURL = 'https://express-training.herokuapp.com/api/user';

const callApi = async (method, url, userData) => {
  try {
    return await axios({
      method,
      url: `${baseURL}${url}`,
      data: userData,
    });
  } catch (error) {
    return error.message;
  }
};

export default callApi;
