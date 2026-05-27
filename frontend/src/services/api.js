import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API}/contact-requests`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || 'Error al enviar la solicitud');
    }
    throw new Error('Error de conexión con el servidor');
  }
};

export const getContactRequests = async () => {
  try {
    const response = await axios.get(`${API}/contact-requests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    throw new Error('Error al obtener solicitudes');
  }
};