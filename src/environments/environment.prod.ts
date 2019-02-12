export const environment = {
  fetchPageSize: 50,
  version: '0.0.3',
  production: true,
  envName: 'prod',
  socketPort: '80',
  baseUrl: 'http://gateway.${K8S_NODE}:80',
  apiUrl: 'http://gateway.${K8S_NODE}:80',
  websocketUrl: 'ws://gateway.${K8S_NODE}:80/dashboard/ws',
  wsProtocol: 'Bearer',
  debug: true,
  addAttackVector: false,
  export: {
    isZipEnabled: false
  }
};