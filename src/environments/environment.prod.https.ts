
export const environment = {
  fetchPageSize: 50,
  version: '0.0.3',
  production: true,
  envName: 'prod',
  socketPort: '80',
  baseUrl: 'https://gateway.${K8S_NODE}:443',
  apiUrl: 'https://gateway.${K8S_NODE}:443',
  websocketUrl: 'wss://gateway.${K8S_NODE}:443/dashboard/ws',
  wsProtocol: 'Bearer',
  debug: true,
  addAttackVector: false,
  export: {
    isZipEnabled: false
  }
};