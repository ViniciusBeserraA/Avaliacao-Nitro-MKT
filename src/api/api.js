import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const submitFormData = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'ECA1AB4CE8583613A2C759B445E98',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`${error.response?.data?.tipoErro || error.message}`);
  }
};
