
export const environment = {
  fetchPageSize: 50,
  version: '0.0.3',
  production: true,
  envName: 'prod',
  socketPort: '80',
  websocketUrl: 'ws://gateway.quantum:80/dashboard/ws',
  wsProtocol: 'Bearer',
  apiUrl: `http://quantum-gateway:8091`,
  debug: true,
  addAttackVector: false,
  export: {
    isZipEnabled: false
  }
};