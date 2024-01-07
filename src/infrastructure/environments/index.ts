export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return '.env.test';
    case 'stage':
      return '.env.stage';
    case 'development':
      return '.env.dev';
    case 'production': 
      return '.env.prod';
    default:
      return '.env';
  }
}
