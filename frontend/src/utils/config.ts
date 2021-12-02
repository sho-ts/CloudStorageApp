const config = {
  api: (() => {
    switch (process.env.NEXT_PUBLIC_MODE) {
      case 'docker':
        return 'http://api:3000';
      case 'local':
        return 'http://localhost:3001'
      case 'production':
        return process.env.NEXT_PUBLIC_API_URL;
      default:
        return 'http://localhost:3001'
    }
  })()
}

export default config;