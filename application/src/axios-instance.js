const axios = require('axios');
import { Platform } from 'react-native';
import { SERVER_BASEURL, a, b } from '@env';

export default axios.create({
  baseURL: SERVER_BASEURL || (Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://127.0.0.1:3000/api'),
});
