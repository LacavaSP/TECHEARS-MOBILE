import axios from 'axios';

const customTechEarsNodeRedAxios = axios.create({
  baseURL: 'http://localhost:1881',
});

// Adicione um interceptor de requisição
customTechEarsNodeRedAxios.interceptors.request.use(
  (config) => {
    // Obtenha o token do localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('idUsuarioLogado');

    // Se o token existir, adicione ao header Authorization
    if (token) {
      if (config.headers) {
        config.headers.token = `${token}`;
        config.headers.userid = userId || '';
      }
    }

    return config;
  },
  (error) => {
    // Lida com o erro de requisição
    return Promise.reject(error);
  }
);

export default customTechEarsNodeRedAxios;
