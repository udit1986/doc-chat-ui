// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require('../../package.json');

export const environment = {
  production: true,
  appVersion: `${version}-dev`,

  apiUrl: '',
  timeout: 5000,

  settings: {
    auth: {

      // keys to store tokens at local storage
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
    },
  },
};