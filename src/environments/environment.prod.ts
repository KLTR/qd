
const protocol = window.location.protocol;
const port = 8091;
const websocketPort = 8091;
// const host = '172.20.2.2'
// const host = '192.168.3.2' 
const host = 'quantum-restful'
export const environment = {
  fetchPageSize: 50,
  version: '0.0.3',
  production: true,
  envName: 'prod',
  socketPort: `${websocketPort}`,
  baseUrl: `${protocol}//${host}:${port}`,
  apiUrl: `${protocol}//${host}:${port}`,
  websocketUrl: `ws://${host}:${websocketPort}`,
  addAttackVector: false,
  export: {
    isZipEnabled: false
  }
};
