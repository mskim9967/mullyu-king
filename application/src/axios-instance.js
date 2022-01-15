const axios = require('axios');
import { Platform } from 'react-native';
import { SERVER_BASEURL } from '@env';

export default axios.create({
  baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://127.0.0.1:3000/api',
});
