/* global FormData */
import axios from 'axios';
import { updateState } from '../state';

axios.defaults.timeout = 8500;

export const getCountryByIp = ip => {
  const data = new FormData();
  data.append('ips', ip);
  return axios
    .post('http://testmyproxies.com/_scripts/showLocations.php', data)
    .then(res => {
      if (!res.data) {
        return 'unk';
      }
      return Object.values(res.data)[0];
    })
    .catch(() => 'unk');
};

export const loadProxyList = () =>
  axios
    //.get('https://jimmy-proxy-api.herokuapp.com/fetch')
    .get('http://lifeofcoding.online/api/proxies.json')
    .then(res => {
      try {
        const list = res.data
          .map(item => {
            try {
              return item;
            } catch (err) {
              return null;
            }
          })
          .filter(item => Boolean(item));
        updateState({
          proxyList: list.map(item => ({
            ip: item.ipAddress,
            port: item.port,
            country: item.country,
            type: item.protocols[0],
          })),
        });
      } catch (err) {
        console.log('err', err);
        return Promise.reject(err);
      }
    });
