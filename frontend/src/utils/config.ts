const config = {
  api: (() => {
    let api = '';
    switch (process.env.NEXT_PUBLIC_MODE) {
      case 'docker':
        api = 'http://api:3000';
        break;
      case 'local':
        api = 'http://localhost:3001'
        break;
    }
    return api;
  })()
}

export default config;