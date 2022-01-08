import axios from 'axios';
import { auth } from '@/utils/aws';
import { config } from '@/utils';

const createAxiosInstance = async (isAuth = true) => {
  if(!isAuth) return axios.create({baseURL: config.api});

  const { token, user } = await auth.getIdTokenAndUser();

  if (!user) throw new Error();

  return axios.create({
    baseURL: config.api,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export default createAxiosInstance;